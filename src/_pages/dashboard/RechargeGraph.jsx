import React, { useState, useEffect } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { useGetFluteRevenueOnGraphQuery } from "../../_store/api";
import { useTheme } from "../../_context/ThemeContext";

export default function RechargeGraph() {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState("weekly");
  const { data: fetchData } = useGetFluteRevenueOnGraphQuery({ dateFilter });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const labels = data.map((item) => item.label);
  const totals = data.map((item) => item.total);

  const handleClickDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#e0e0e0" : "inherit",
        border: `1px solid ${isDarkMode ? "#333333" : "var(--dashboard-card-border, #e0e0e0)"}`,
        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "var(--dashboard-card-shadow, 0 2px 8px rgba(0,0,0,0.08))",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pb: 2,
          borderBottom: isDarkMode ? "1px solid #333333" : "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Recharge
        </h2>
        <select
          value={dateFilter}
          onChange={handleClickDateFilter}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: `1px solid ${isDarkMode ? "#333333" : "#cbd5e0"}`,
            backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
            color: isDarkMode ? "#e0e0e0" : "inherit",
            fontSize: "13px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="total">Total</option>
        </select>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <LineChart
          height={300}
          series={[
            {
              data: totals,
              label: "Flute Revenue",
              area: true,
              showMark: true,
              color: "rgba(76, 178, 55, 0.55)",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: labels,
            },
          ]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
            ".MuiChartsAxis-tickLabel": {
              strokeWidth: "0.4",
              fill: isDarkMode ? "#a0a0a0" : "#666",
            },
            ".MuiChartsAxis-line": {
              stroke: isDarkMode ? "#555555" : "#666",
              strokeWidth: 1,
            },
            ".MuiChartsAxis-tick": {
              stroke: isDarkMode ? "#555555" : "#666",
              strokeWidth: 1,
            },
            width: "100%",
          }}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 13,
                fill: isDarkMode ? "#e0e0e0" : "#333",
                fontWeight: 500,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
