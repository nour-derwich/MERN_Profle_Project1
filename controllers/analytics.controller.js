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

  // Total page views
  const pageViewsQuery = `
    SELECT COUNT(*) as total_views
    FROM analytics
    WHERE event_type = 'page_view'
    ${start_date ? "AND created_at >= $1" : ""}
    ${end_date ? "AND created_at <= $2" : ""}
  `;

  // Total registrations
  const registrationsQuery = `
    SELECT COUNT(*) as total_registrations
    FROM registrations
    ${start_date ? "AND created_at >= $1" : ""}
    ${end_date ? "AND created_at <= $2" : ""}
  `;

  // Total messages
  const messagesQuery = `
    SELECT COUNT(*) as total_messages
    FROM messages
    ${start_date ? "AND created_at >= $1" : ""}
    ${end_date ? "AND created_at <= $2" : ""}
  `;

  // Total formations
  const formationsQuery =
    "SELECT COUNT(*) as total_formations FROM formations WHERE status = $1";

  const params = [];
  if (start_date) params.push(start_date);
  if (end_date) params.push(end_date);

  const [pageViews, registrations, messages, formations] = await Promise.all([
    query(pageViewsQuery, params),
    query(registrationsQuery, params),
    query(messagesQuery, params),
    query(formationsQuery, ["published"]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      total_views: parseInt(pageViews.rows[0].total_views),
      total_registrations: parseInt(registrations.rows[0].total_registrations),
      total_messages: parseInt(messages.rows[0].total_messages),
      total_formations: parseInt(formations.rows[0].total_formations),
    },
  });
});

// @desc    Get formation analytics
// @route   GET /api/analytics/formations
// @access  Private/Admin
exports.getFormationAnalytics = asyncHandler(async (req, res) => {
  const text = `
    SELECT 
      f.id,
      f.title,
      f.category,
      f.current_participants,
      f.max_participants,
      f.views_count,
      COUNT(DISTINCT r.id) as registrations_count,
      COUNT(DISTINCT CASE WHEN r.status = 'confirmed' THEN r.id END) as confirmed_count,
      COALESCE(SUM(CASE WHEN r.payment_status = 'paid' THEN r.amount_paid ELSE 0 END), 0) as total_revenue
    FROM formations f
    LEFT JOIN registrations r ON f.id = r.formation_id
    GROUP BY f.id
    ORDER BY registrations_count DESC
  `;

  const result = await query(text);

  res.status(200).json({
    success: true,
    data: result.rows
  });
});

// @desc    Get traffic analytics
// @route   GET /api/analytics/traffic
// @access  Private/Admin
exports.getTrafficAnalytics = asyncHandler(async (req, res) => {
  const { days = 30 } = req.query;

  // Daily page views
  const dailyViewsQuery = `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as views
    FROM analytics
    WHERE event_type = 'page_view'
    AND created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY DATE(created_at)
    ORDER BY date DESC
  `;

  // Top pages
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

  // Top referrers
  const topReferrersQuery = `
    SELECT 
      referrer,
      COUNT(*) as count
    FROM analytics
    WHERE referrer IS NOT NULL
    AND referrer != ''
    AND created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY referrer
    ORDER BY count DESC
    LIMIT 10
  `;

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
});

// @desc    Get monthly analytics
// @route   GET /api/analytics/monthly
// @access  Private/Admin
exports.getMonthlyAnalytics = asyncHandler(async (req, res) => {
  const text = 'SELECT * FROM monthly_analytics ORDER BY month DESC LIMIT 12';
  const result = await query(text);

  res.status(200).json({
    success: true,
    data: result.rows
  });
});