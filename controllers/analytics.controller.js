const { query } = require("../config/database");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Track analytics event
// @route   POST /api/analytics/track
// @access  Public
exports.trackEvent = asyncHandler(async (req, res) => {
  const { event_type, entity_type, entity_id, page_url, referrer, metadata } =
    req.body;

  const text = `
    INSERT INTO analytics (
      event_type, entity_type, entity_id, page_url, referrer,
      user_agent, ip_address, metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;

  const values = [
    event_type,
    entity_type,
    entity_id,
    page_url,
    referrer,
    req.headers["user-agent"],
    req.ip,
    JSON.stringify(metadata || {}),
  ];

  await query(text, values);

  res.status(201).json({
    success: true,
    message: "Event tracked",
  });
});

// @desc    Get analytics overview
// @route   GET /api/analytics/overview
// @access  Private/Admin
exports.getOverview = asyncHandler(async (req, res) => {
  const { start_date, end_date } = req.query;

  let dateWhere = '';
  const params = [];
  
  if (start_date) {
    params.push(start_date);
    dateWhere += ` AND created_at >= $${params.length}`;
  }
  if (end_date) {
    params.push(end_date);
    dateWhere += ` AND created_at <= $${params.length}`;
  }

  // Total page views
  const pageViewsQuery = `
    SELECT COUNT(*) as total_views
    FROM analytics
    WHERE event_type = 'page_view'
    ${dateWhere}
  `;

  // Total registrations
  const registrationsQuery = `
    SELECT COUNT(*) as total_registrations
    FROM registrations
    WHERE 1=1 ${dateWhere.replace(/created_at/g, 'registration_date')}
  `;

  // Total messages
  const messagesQuery = `
    SELECT COUNT(*) as total_messages
    FROM messages
    WHERE 1=1 ${dateWhere}
  `;

  // Total formations
  const formationsQuery = `
    SELECT COUNT(*) as total_formations 
    FROM formations 
    WHERE status = $${params.length + 1}
  `;

  const [pageViews, registrations, messages, formations] = await Promise.all([
    query(pageViewsQuery, params),
    query(registrationsQuery, params),
    query(messagesQuery, params),
    query(formationsQuery, [...params, 'published']),
  ]);

  res.status(200).json({
    success: true,
    data: {
      total_views: parseInt(pageViews.rows[0]?.total_views || 0),
      total_registrations: parseInt(registrations.rows[0]?.total_registrations || 0),
      total_messages: parseInt(messages.rows[0]?.total_messages || 0),
      total_formations: parseInt(formations.rows[0]?.total_formations || 0),
    },
  });
});

// @desc    Get formation analytics
// @route   GET /api/analytics/formations
// @access  Private/Admin
exports.getFormationAnalytics = asyncHandler(async (req, res) => {
  // FIXED: Removed payment_status and amount_paid references
  const text = `
    SELECT 
      f.id,
      f.title,
      f.category,
      f.current_participants,
      f.max_participants,
      f.views_count,
      f.price,
      COUNT(DISTINCT r.id) as registrations_count,
      COUNT(DISTINCT CASE WHEN r.status = 'confirmed' THEN r.id END) as confirmed_count,
      -- Calculate potential revenue based on formation price and confirmed registrations
      (f.price * COUNT(DISTINCT CASE WHEN r.status = 'confirmed' THEN r.id END)) as potential_revenue
    FROM formations f
    LEFT JOIN registrations r ON f.id = r.formation_id
    WHERE f.status = 'published'
    GROUP BY f.id
    ORDER BY registrations_count DESC
  `;

  const result = await query(text);

  // Map potential_revenue to total_revenue for frontend compatibility
  const rows = result.rows.map(row => ({
    ...row,
    total_revenue: row.potential_revenue || 0
  }));

  res.status(200).json({
    success: true,
    data: rows
  });
});

// @desc    Get traffic analytics
// @route   GET /api/analytics/traffic
// @access  Private/Admin
exports.getTrafficAnalytics = asyncHandler(async (req, res) => {
  const { period = "30" } = req.query;
  const days = parseInt(period) || 30;

  // Daily page views (last X days)
  const dailyViewsQuery = `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as views
    FROM analytics
    WHERE event_type = 'page_view'
    AND created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  // Top pages (last X days)
  const topPagesQuery = `
    SELECT 
      page_url,
      COUNT(*) as views
    FROM analytics
    WHERE event_type = 'page_view'
    AND created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY page_url
    ORDER BY views DESC
    LIMIT 10
  `;

  // Top referrers (last X days)
  const topReferrersQuery = `
    SELECT 
      COALESCE(NULLIF(referrer, ''), 'Direct') as referrer,
      COUNT(*) as count
    FROM analytics
    WHERE event_type = 'page_view'
    AND created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY COALESCE(NULLIF(referrer, ''), 'Direct')
    ORDER BY count DESC
    LIMIT 10
  `;

  try {
    const [dailyViews, topPages, topReferrers] = await Promise.all([
      query(dailyViewsQuery),
      query(topPagesQuery),
      query(topReferrersQuery)
    ]);

    res.status(200).json({
      success: true,
      data: {
        daily_views: dailyViews.rows,
        top_pages: topPages.rows,
        top_referrers: topReferrers.rows
      }
    });
  } catch (error) {
    console.error('Traffic analytics error:', error);
    res.status(200).json({
      success: true,
      data: {
        daily_views: [],
        top_pages: [],
        top_referrers: []
      }
    });
  }
});

// @desc    Get conversion analytics
// @route   GET /api/analytics/conversions
// @access  Private/Admin
exports.getConversionAnalytics = asyncHandler(async (req, res) => {
  // Formation conversion rate
  const formationConversionQuery = `
    SELECT 
      f.id,
      f.title,
      f.views_count,
      COUNT(DISTINCT r.id) as registrations,
      CASE 
        WHEN f.views_count > 0 THEN ROUND((COUNT(DISTINCT r.id)::DECIMAL / f.views_count) * 100, 2)
        ELSE 0 
      END as conversion_rate
    FROM formations f
    LEFT JOIN registrations r ON f.id = r.formation_id
    WHERE f.status = 'published'
    GROUP BY f.id
    ORDER BY conversion_rate DESC
    LIMIT 10
  `;

  // Course clicks
  const courseClicksQuery = `
    SELECT 
      c.id,
      c.title,
      c.clicks_count
    FROM courses c
    ORDER BY c.clicks_count DESC
    LIMIT 10
  `;

  try {
    const [formationConversions, courseClicks] = await Promise.all([
      query(formationConversionQuery),
      query(courseClicksQuery)
    ]);

    res.status(200).json({
      success: true,
      data: {
        formation_conversions: formationConversions.rows,
        top_course_clicks: courseClicks.rows
      }
    });
  } catch (error) {
    console.error('Conversion analytics error:', error);
    res.status(200).json({
      success: true,
      data: {
        formation_conversions: [],
        top_course_clicks: []
      }
    });
  }
});

// @desc    Get monthly analytics
// @route   GET /api/analytics/monthly
// @access  Private/Admin
exports.getMonthlyAnalytics = asyncHandler(async (req, res) => {
  try {
    const text = `
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') as month,
        event_type,
        COUNT(*) as event_count
      FROM analytics
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at), event_type
      ORDER BY DATE_TRUNC('month', created_at) DESC
      LIMIT 24
    `;
    
    const result = await query(text);
    
    // Format data for chart
    const monthlyData = {};
    result.rows.forEach(row => {
      if (!monthlyData[row.month]) {
        monthlyData[row.month] = { month: row.month };
      }
      monthlyData[row.month][row.event_type] = parseInt(row.event_count);
    });

    res.status(200).json({
      success: true,
      data: Object.values(monthlyData)
    });
  } catch (error) {
    console.error('Monthly analytics error:', error);
    res.status(200).json({
      success: true,
      data: []
    });
  }
});