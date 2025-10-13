import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { useGetRechargeGraphListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState(""); // Empty string for default
  const [granularity, setGranularity] = useState("");

  // Uncomment this in your actual implementation:
  const { data: fetchData, isLoading } = useGetRechargeGraphListQuery({
    granularity,
  });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // Transform data for the bar chart
  const transformedData = data.map((item) => ({
    admin: parseFloat(item?.admin || 0),
    user: parseFloat(item?.user || 0),
  }));

  // Extract data for each series
  const adminData = transformedData.map((item) => item.admin);
  const userData = transformedData.map((item) => item.user);

  // Use labels from API response
  const xAxisLabels = data.map((item) => item.label);

  const handleDateFilterChange = (e) => {
    setGranularity(e.target.value);
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
    // return <Atom color="#32cd32" size="medium" text="" textColor="" />;
  }

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
        <h2 style={{ margin: 0 }}>Recharge</h2>
        <select
          value={granularity}
          onChange={handleDateFilterChange}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="">Current Month (Daily)</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
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
                data: userData,
                label: "User Recharge",
                stack: "total",
                color: "#5174c0ff", // slate gray
              },
              {
                data: adminData,
                label: "Admin Recharge",
                stack: "total",
                // color: "#ffd35bff", // royal blue
                color: "#ff9040ff",
              },
            ]}
            xAxis={[
              {
                data: xAxisLabels,
                scaleType: "band",
                tickLabelStyle: {
                  angle: 0,
                  textAnchor: "middle",
                },

                categoryGapRatio: 0.5, // Space on left/right of each bar (0-1, higher = more space)
                barGapRatio: 0, // Gap between bars in same category (for grouped bars)
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
                  fill: "#666",
                },
              },
              bar: {
                width: 20, // Fixed width of 12px
              },
            }}
            sx={{
              ".MuiChartsAxis-tickLabel": {
                strokeWidth: "0.4",
                fill: "#666",
              },
              ".MuiChartsAxis-line": {
                stroke: "#E5E7EB",
                strokeWidth: 0.4,
              },
              ".MuiChartsAxis-tick": {
                stroke: "#E5E7EB",
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
        <div>dfef</div>
      </Box>
    </Box>
  );
}
