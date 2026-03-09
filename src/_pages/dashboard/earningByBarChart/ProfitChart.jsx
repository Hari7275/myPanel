import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { useTheme } from "../../../_context/ThemeContext";
// import { useGetFluteEarningsQuery } from "../../_store/api"; // Uncomment in your actual code

// Example JSON structures for different filters
const exampleAPIResponses = {
  // Default (no filter) - Shows current month data day by day
  default: {
    data: [
      {
        label: "Oct 1",
        date: "2024-10-01",
        qd_activity_amount: 320.5,
        dating_activity_amount: 450.75,
        subscription_amount: 649.0,
        orders_earning_amount: 1250.0,
        sessions_earning_amount: 97.5,
      },
      {
        label: "Oct 2",
        date: "2024-10-02",
        qd_activity_amount: 410.0,
        dating_activity_amount: 380.5,
        subscription_amount: 449.0,
        orders_earning_amount: 1890.0,
        sessions_earning_amount: 120.0,
      },
      {
        label: "Oct 3",
        date: "2024-10-03",
        qd_activity_amount: 285.0,
        dating_activity_amount: 325.0,
        subscription_amount: 549.0,
        orders_earning_amount: 950.0,
        sessions_earning_amount: 115.0,
      },
      {
        label: "Oct 4",
        date: "2024-10-04",
        qd_activity_amount: 520.0,
        dating_activity_amount: 615.0,
        subscription_amount: 749.0,
        orders_earning_amount: 1450.0,
        sessions_earning_amount: 135.0,
      },
      {
        label: "Oct 5",
        date: "2024-10-05",
        qd_activity_amount: 445.0,
        dating_activity_amount: 490.0,
        subscription_amount: 649.0,
        orders_earning_amount: 1180.0,
        sessions_earning_amount: 125.0,
      },
      {
        label: "Oct 6",
        date: "2024-10-06",
        qd_activity_amount: 380.0,
        dating_activity_amount: 420.0,
        subscription_amount: 349.0,
        orders_earning_amount: 890.0,
        sessions_earning_amount: 110.0,
      },
      {
        label: "Oct 7",
        date: "2024-10-07",
        qd_activity_amount: 490.0,
        dating_activity_amount: 560.0,
        subscription_amount: 849.0,
        orders_earning_amount: 1320.0,
        sessions_earning_amount: 140.0,
      },
      {
        label: "Oct 8",
        date: "2024-10-08",
        qd_activity_amount: 610.0,
        dating_activity_amount: 690.0,
        subscription_amount: 949.0,
        orders_earning_amount: 1680.0,
        sessions_earning_amount: 150.0,
      },
      {
        label: "Oct 9",
        date: "2024-10-09",
        qd_activity_amount: 340.0,
        dating_activity_amount: 385.0,
        subscription_amount: 549.0,
        orders_earning_amount: 920.0,
        sessions_earning_amount: 105.0,
      },
      {
        label: "Oct 10",
        date: "2024-10-10",
        qd_activity_amount: 515.0,
        dating_activity_amount: 580.0,
        subscription_amount: 749.0,
        orders_earning_amount: 1390.0,
        sessions_earning_amount: 130.0,
      },
      {
        label: "Oct 11",
        date: "2024-10-11",
        qd_activity_amount: 565.0,
        dating_activity_amount: 625.0,
        subscription_amount: 849.0,
        orders_earning_amount: 1540.0,
        sessions_earning_amount: 145.0,
      },
      {
        label: "Oct 12",
        date: "2024-10-12",
        qd_activity_amount: 425.0,
        dating_activity_amount: 480.0,
        subscription_amount: 649.0,
        orders_earning_amount: 1210.0,
        sessions_earning_amount: 125.0,
      },
    ],
    meta: {
      filter: "daily",
      month: "October",
      year: 2024,
      totalDays: 12,
    },
  },

  // Weekly filter - Shows weeks of current year
  weekly: {
    data: [
      {
        label: "Week 1",
        week: 1,
        year: 2024,
        qd_activity_amount: 2850.5,
        dating_activity_amount: 3120.75,
        subscription_amount: 4490.0,
        orders_earning_amount: 8950.0,
        sessions_earning_amount: 875.5,
      },
      {
        label: "Week 2",
        week: 2,
        year: 2024,
        qd_activity_amount: 3180.0,
        dating_activity_amount: 3450.5,
        subscription_amount: 4890.0,
        orders_earning_amount: 9780.0,
        sessions_earning_amount: 920.0,
      },
      {
        label: "Week 3",
        week: 3,
        year: 2024,
        qd_activity_amount: 3420.0,
        dating_activity_amount: 3780.0,
        subscription_amount: 5240.0,
        orders_earning_amount: 10450.0,
        sessions_earning_amount: 980.0,
      },
      {
        label: "Week 4",
        week: 4,
        year: 2024,
        qd_activity_amount: 3090.0,
        dating_activity_amount: 3350.0,
        subscription_amount: 4680.0,
        orders_earning_amount: 9120.0,
        sessions_earning_amount: 890.0,
      },
      {
        label: "Week 5",
        week: 5,
        year: 2024,
        qd_activity_amount: 3560.0,
        dating_activity_amount: 3890.0,
        subscription_amount: 5420.0,
        orders_earning_amount: 10890.0,
        sessions_earning_amount: 1015.0,
      },
      {
        label: "Week 6",
        week: 6,
        year: 2024,
        qd_activity_amount: 3280.0,
        dating_activity_amount: 3520.0,
        subscription_amount: 4980.0,
        orders_earning_amount: 9580.0,
        sessions_earning_amount: 945.0,
      },
      {
        label: "Week 7",
        week: 7,
        year: 2024,
        qd_activity_amount: 3750.0,
        dating_activity_amount: 4120.0,
        subscription_amount: 5680.0,
        orders_earning_amount: 11250.0,
        sessions_earning_amount: 1080.0,
      },
      {
        label: "Week 8",
        week: 8,
        year: 2024,
        qd_activity_amount: 3480.0,
        dating_activity_amount: 3780.0,
        subscription_amount: 5290.0,
        orders_earning_amount: 10450.0,
        sessions_earning_amount: 1025.0,
      },
      {
        label: "Week 9",
        week: 9,
        year: 2024,
        qd_activity_amount: 3890.0,
        dating_activity_amount: 4250.0,
        subscription_amount: 5840.0,
        orders_earning_amount: 11680.0,
        sessions_earning_amount: 1120.0,
      },
      {
        label: "Week 10",
        week: 10,
        year: 2024,
        qd_activity_amount: 3320.0,
        dating_activity_amount: 3580.0,
        subscription_amount: 5120.0,
        orders_earning_amount: 9850.0,
        sessions_earning_amount: 975.0,
      },
      {
        label: "Week 11",
        week: 11,
        year: 2024,
        qd_activity_amount: 3980.0,
        dating_activity_amount: 4380.0,
        subscription_amount: 6020.0,
        orders_earning_amount: 11950.0,
        sessions_earning_amount: 1180.0,
      },
      {
        label: "Week 12",
        week: 12,
        year: 2024,
        qd_activity_amount: 3650.0,
        dating_activity_amount: 3920.0,
        subscription_amount: 5480.0,
        orders_earning_amount: 10780.0,
        sessions_earning_amount: 1090.0,
      },
    ],
    meta: {
      filter: "weekly",
      currentWeek: 12,
      totalWeeksInYear: 52,
      year: 2024,
    },
  },

  // Monthly filter - Shows months (only 6 months available)
  monthly: {
    data: [
      {
        label: "Jan",
        month: 1,
        year: 2024,
        qd_activity_amount: 15250.5,
        dating_activity_amount: 16840.75,
        subscription_amount: 22490.0,
        orders_earning_amount: 45890.0,
        sessions_earning_amount: 4250.5,
      },
      {
        label: "Feb",
        month: 2,
        year: 2024,
        qd_activity_amount: 13980.0,
        dating_activity_amount: 15420.5,
        subscription_amount: 20890.0,
        orders_earning_amount: 42150.0,
        sessions_earning_amount: 3920.0,
      },
      {
        label: "Mar",
        month: 3,
        year: 2024,
        qd_activity_amount: 16420.0,
        dating_activity_amount: 17890.0,
        subscription_amount: 24180.0,
        orders_earning_amount: 48950.0,
        sessions_earning_amount: 4580.0,
      },
      {
        label: "Apr",
        month: 4,
        year: 2024,
        qd_activity_amount: 15890.0,
        dating_activity_amount: 17250.0,
        subscription_amount: 23450.0,
        orders_earning_amount: 47250.0,
        sessions_earning_amount: 4420.0,
      },
      {
        label: "May",
        month: 5,
        year: 2024,
        qd_activity_amount: 17250.0,
        dating_activity_amount: 18920.0,
        subscription_amount: 25680.0,
        orders_earning_amount: 51890.0,
        sessions_earning_amount: 4850.0,
      },
      {
        label: "Jun",
        month: 6,
        year: 2024,
        qd_activity_amount: 16580.0,
        dating_activity_amount: 18120.0,
        subscription_amount: 24820.0,
        orders_earning_amount: 49580.0,
        sessions_earning_amount: 4680.0,
      },
    ],
    meta: {
      filter: "monthly",
      monthsAvailable: 6,
      year: 2024,
    },
  },

  // Yearly filter - Shows years
  yearly: {
    data: [
      {
        label: "2022",
        year: 2022,
        qd_activity_amount: 165250.5,
        dating_activity_amount: 178840.75,
        subscription_amount: 245490.0,
        orders_earning_amount: 485890.0,
        sessions_earning_amount: 45250.5,
      },
      {
        label: "2023",
        year: 2023,
        qd_activity_amount: 189820.0,
        dating_activity_amount: 205420.5,
        subscription_amount: 278890.0,
        orders_earning_amount: 542150.0,
        sessions_earning_amount: 51920.0,
      },
      {
        label: "2024",
        year: 2024,
        qd_activity_amount: 95370.0,
        dating_activity_amount: 104240.25,
        subscription_amount: 141510.0,
        orders_earning_amount: 285700.0,
        sessions_earning_amount: 26700.0,
      },
    ],
    meta: {
      filter: "yearly",
      yearsAvailable: 3,
      currentYear: 2024,
    },
  },
};

export default function ProfitChart() {
  const { isDarkMode } = useTheme();
  const axisColor = isDarkMode ? "#a0a0b0" : "#666";
  const axisLineColor = isDarkMode ? "#3a3a5c" : "#E5E7EB";
  const emptyStateBg = isDarkMode ? "#1a1a2e" : "#f5f5f5";
  const selectStyle = {
    padding: "8px 12px",
    borderRadius: "4px",
    border: `1px solid ${isDarkMode ? "var(--input-border)" : "#ccc"}`,
    backgroundColor: isDarkMode ? "var(--input-bg)" : "white",
    color: isDarkMode ? "var(--input-text)" : "inherit",
    fontSize: "14px",
    cursor: "pointer",
  };

  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState(""); // Empty string for default

  // Uncomment this in your actual implementation:
  // const { data: fetchData, isLoading } = useGetFluteEarningsQuery({
  //   dateFilter: dateFilter || undefined
  // });

  // For demo purposes, using example data
  const fetchData = exampleAPIResponses[dateFilter || "default"];
  const isLoading = false;

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // Transform data for the bar chart
  const transformedData = data.map((item) => ({
    qd_activity: parseFloat(item.qd_activity_amount || 0),
    dating_activity: parseFloat(item.dating_activity_amount || 0),
    subscription: parseFloat(item.subscription_amount || 0),
    orders_earning: parseFloat(item.orders_earning_amount || 0),
    sessions_earning: parseFloat(item.sessions_earning_amount || 0),
  }));

  // Extract data for each series
  const qdActivityData = transformedData.map((item) => item.qd_activity);
  const datingActivityData = transformedData.map(
    (item) => item.dating_activity
  );
  const subscriptionData = transformedData.map((item) => item.subscription);
  const ordersEarningData = transformedData.map((item) => item.orders_earning);
  const sessionsEarningData = transformedData.map(
    (item) => item.sessions_earning
  );

  // Use labels from API response
  const xAxisLabels = data.map((item) => item.label);

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  console.log("Current filter:", dateFilter);
  console.log("API Response:", fetchData);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <h2 style={{ margin: 0, color: "var(--dashboard-heading-color)", fontWeight: 700 }}>Recharge</h2>
        <select
          value={dateFilter}
          onChange={handleDateFilterChange}
          style={selectStyle}
        >
          <option value="">Current Month (Daily)</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </Box>

      {isLoading ? (
        <div
          style={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: emptyStateBg,
            borderRadius: "8px",
            color: axisColor,
          }}
        >
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div
          style={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: emptyStateBg,
            borderRadius: "8px",
            color: axisColor,
          }}
        >
          No data available
        </div>
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              minWidth: 600,
              maxWidth:
                data.length <= 4
                  ? 400
                  : data.length <= 8
                  ? 800
                  : data.length <= 12
                  ? 900
                  : data.length * 50,
              width: "auto",
              margin: "0 auto",
            }}
          >
            <BarChart
              height={400}
              series={[
                {
                  data: qdActivityData,
                  label: "QD Activity",
                  stack: "total",
                  color: "#495afb",
                },
                {
                  data: datingActivityData,
                  label: "Dating Activity",
                  stack: "total",
                  color: "#EC4899",
                },
                {
                  data: subscriptionData,
                  label: "Subscription",
                  stack: "total",
                  color: "#1ED88E",
                },
                {
                  data: ordersEarningData,
                  label: "Orders Earning",
                  stack: "total",
                  color: "#ca651cd8",
                },
                {
                  data: sessionsEarningData,
                  label: "Sessions Earning",
                  stack: "total",
                  color: "#8ED6E2",
                },
              ]}
              xAxis={[
                {
                  data: xAxisLabels,
                  scaleType: "band",
                  tickLabelStyle: {
                    angle: 45,
                    textAnchor: "start",
                  },

                  barGapRatio: 1, // Gap between bars in same category (10%)
                  barCategoryGapRatio: 0.8, // Gap between categories (20%)
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: 0,
                  itemMarkWidth: 20,
                  itemMarkHeight: 10,
                  markGap: 8,
                  itemGap: 15,
                  labelStyle: {
                    fontSize: 12,
                    fill: axisColor,
                  },
                },
                bar: {
                  width: 12, // Fixed width of 12px
                },
              }}
              sx={{
                ".MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.4",
                  fill: axisColor,
                },
                ".MuiChartsAxis-line": {
                  stroke: axisLineColor,
                  strokeWidth: 0.4,
                },
                ".MuiChartsAxis-tick": {
                  stroke: axisLineColor,
                  strokeWidth: 0.4,
                },
                // Override bar width using CSS
                "& .MuiBarElement-root": {
                  width: "20px !important",
                },
              }}
              margin={{ left: 100, right: 100, top: 40, bottom: 80 }}
              barLabel={false}
              // Disable axis hover effects
              disableAxisListener
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
