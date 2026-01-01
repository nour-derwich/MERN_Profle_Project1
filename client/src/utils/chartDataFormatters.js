// Format monthly analytics data for line/bar charts
export const formatMonthlyData = (backendData) => {
  const defaultMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    labels: backendData?.months || defaultMonths.slice(0, 6),
    datasets: [
      {
        label: "Visitors",
        data: backendData?.visitors || [65, 59, 80, 81, 56, 55],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Registrations",
        data: backendData?.registrations || [28, 48, 40, 56, 72, 68],
        borderColor: "#ec4899",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

// Format traffic sources for pie/doughnut chart
export const formatTrafficSources = (backendData) => {
  const defaultData = [
    { source: "Direct", percentage: 40 },
    { source: "Social Media", percentage: 25 },
    { source: "Search Engines", percentage: 20 },
    { source: "Referrals", percentage: 15 },
  ];

  const data = backendData || defaultData;
  const colors = [
    "rgba(139, 92, 246, 0.8)",
    "rgba(236, 72, 153, 0.8)",
    "rgba(20, 184, 166, 0.8)",
    "rgba(251, 146, 60, 0.8)",
    "rgba(59, 130, 246, 0.8)",
  ];

  return {
    labels: data.map((item) => item.source),
    datasets: [
      {
        data: data.map((item) => item.percentage),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors
          .map((color) => color.replace("0.8", "1"))
          .slice(0, data.length),
        borderWidth: 2,
      },
    ],
  };
};
