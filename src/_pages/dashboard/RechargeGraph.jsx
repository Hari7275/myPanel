import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { useGetFluteRevenueOnGraphQuery } from "../../_store/api";
import { useTheme } from "../../_context/ThemeContext";
import "./OnboardingAssociateDashboard.css";

export default function RechargeGraph() {
  const { isDarkMode } = useTheme();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState("weekly");
  const { data: fetchData, isFetching } = useGetFluteRevenueOnGraphQuery({ dateFilter });

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
      className="crg-container"
      sx={{
        width: "100%",
        padding: isMobile ? "10px" : "24px",
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
          mb: isMobile ? 1 : 2,
          pb: isMobile ? 1 : 2,
          borderBottom: isDarkMode ? "1px solid #333333" : "1px solid #E5E7EB",
        }}
      >
        <h2 className="crg-title" style={{ margin: 0, fontSize: isMobile ? "14px" : "20px", fontWeight: 600 }}>
          Recharge
        </h2>
        <select
          value={dateFilter}
          onChange={handleClickDateFilter}
          style={{
            padding: isMobile ? "4px 6px" : "6px 10px",
            borderRadius: "8px",
            border: `1px solid ${isDarkMode ? "#333333" : "#cbd5e0"}`,
            backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
            color: isDarkMode ? "#e0e0e0" : "inherit",
            fontSize: isMobile ? "11px" : "13px",
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
      {isFetching && data.length === 0 ? (
        <div className="skeleton-section" style={{ border: "none", padding: 0 }}>
          <div className="skeleton-card skeleton-pulse" style={{ height: isMobile ? "200px" : "300px", borderRadius: "8px" }} />
        </div>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <LineChart
            height={isMobile ? 200 : 300}
            series={[
              {
                data: totals,
                label: "Flute Revenue",
                area: true,
                showMark: true,
                color: "rgba(76, 178, 55, 0.55)",
                valueFormatter: (value) => {
                  if (value >= 100000) return `₹ ${(value / 100000).toFixed(2)}L`;
                  if (value >= 1000) return `₹ ${(value / 1000).toFixed(1)}k`;
                  return `₹ ${value}`;
                },
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: labels,
                tickLabelStyle: {
                  fontSize: isMobile ? 9 : 12,
                  angle: isMobile ? 45 : 0,
                  textAnchor: isMobile ? "start" : "middle",
                },
              },
            ]}
            yAxis={[{
              valueFormatter: (value) => {
                const abs = Math.abs(value);
                if (abs >= 100000) return `${(value / 100000).toFixed(abs >= 1000000 ? 0 : 1)}L`;
                if (abs >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return `${value}`;
              },
              tickLabelStyle: {
                fontSize: isMobile ? 9 : 12,
              },
            }]}
            sx={{
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
              ".MuiMarkElement-root": {
                fill: isDarkMode ? "#4cb237" : "#3a9e28",
                stroke: isDarkMode ? "#1e1e1e" : "#fff",
                strokeWidth: 2,
                r: isMobile ? 3 : 4,
              },
              width: "100%",
            }}
            margin={isMobile
              ? { left: 28, right: 5, top: 30, bottom: 50 }
              : { left: 40, right: 15, top: 40, bottom: 30 }
            }
            slotProps={{
              legend: {
                hidden: true,
              },
              popper: {
                sx: {
                  "& .MuiChartsTooltip-paper, & .MuiChartsTooltip-root, & .MuiPaper-root": {
                    border: `1.5px solid ${isDarkMode ? "#555" : "#ccc"} !important`,
                    borderRadius: "8px !important",
                    boxShadow: isDarkMode
                      ? "0 4px 12px rgba(0,0,0,0.5) !important"
                      : "0 4px 12px rgba(0,0,0,0.15) !important",
                    backgroundColor: isDarkMode ? "#1e1e1e !important" : "#fff !important",
                    color: isDarkMode ? "#e0e0e0 !important" : "#333 !important",
                    ...(isMobile && {
                      fontSize: "10px",
                      padding: "4px 6px",
                    }),
                  },
                  "& .MuiChartsTooltip-table": {
                    ...(isMobile && { fontSize: "10px" }),
                  },
                  "& .MuiChartsTooltip-cell": {
                    color: isDarkMode ? "#e0e0e0 !important" : "#333 !important",
                    ...(isMobile && {
                      padding: "1px 4px",
                      fontSize: "10px",
                    }),
                  },
                  "& .MuiChartsTooltip-mark": {
                    ...(isMobile && {
                      width: "8px !important",
                      height: "8px !important",
                    }),
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
