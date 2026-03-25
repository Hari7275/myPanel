import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { Atom } from "react-loading-indicators";
import "../../dashboard/earningByBarChart/earningByBarChart.css";
import { useLazyGetUserRegisteredGraphQuery } from "../../../_store/api";
import { useTheme } from "../../../_context/ThemeContext";

const CustomAxisTooltip = ({ series, axisValue, dataIndex, isDarkMode }) => {
  if (dataIndex == null) return null;
  const android = series.find((s) => s.label === "Android");
  const ios = series.find((s) => s.label === "iOS");
  const androidVal = android?.data[dataIndex] ?? 0;
  const iosVal = ios?.data[dataIndex] ?? 0;
  const total = androidVal + iosVal;

  const rows = [
    { label: "Android", color: "#ff9040ff", value: androidVal },
    { label: "iOS", color: "#5174c0ff", value: iosVal },
  ];

  return (
    <div
      style={{
        background: isDarkMode ? "#1e1e1e" : "#fff",
        border: `1px solid ${isDarkMode ? "#333333" : "#e0e0e0"}`,
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.15)",
        fontSize: 13,
        color: isDarkMode ? "#e0e0e0" : "#333",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{axisValue}</div>
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 4,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: row.color,
                display: "inline-block",
              }}
            />
            <span style={{ color: isDarkMode ? "#a0a0a0" : "#555" }}>{row.label}</span>
          </div>
          <span style={{ fontWeight: 500 }}>{row.value}</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${isDarkMode ? "#333333" : "#e0e0e0"}`,
          marginTop: 4,
          paddingTop: 6,
          fontWeight: 600,
        }}
      >
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

const getDefaultDates = (t) => {
  const today = new Date();
  const end = today.toISOString().split("T")[0];
  const start = new Date();
  if (t === "monthly") { start.setMonth(0); start.setDate(1); }
  else if (t === "yearly") start.setFullYear(start.getFullYear() - 5);
  else start.setDate(start.getDate() - 30);
  return { start: start.toISOString().split("T")[0], end };
};

const UserRegisteredGraphInline = () => {
  const { isDarkMode } = useTheme();
  const [type, setType] = useState("daily");
  const [defaultDates] = useState(() => getDefaultDates("daily"));
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);

  const [fetchGraph, { data: fetchData, isLoading, isFetching }] =
    useLazyGetUserRegisteredGraphQuery();

  useEffect(() => {
    fetchGraph({ type, startDate, endDate });
  }, [type, startDate, endDate, fetchGraph]);

  const graphData = fetchData?.data || [];

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const getLabel = (item) => {
    if (type === "monthly" && item.month) return `${monthNames[item.month - 1]} ${item.year}`;
    if (type === "yearly" && item.year) return `${item.year}`;
    if (item.date) return item.date;
    return item.label || "";
  };

  const xAxisLabels = graphData.map((item) => getLabel(item));
  const iosCounts = graphData.map((item) => parseInt(item.ios_count || 0, 10));
  const androidCounts = graphData.map((item) => parseInt(item.android_count || 0, 10));

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    const { start, end } = getDefaultDates(selectedType);
    setStartDate(start);
    setEndDate(end);
  };

  const handleReset = () => {
    setType("daily");
    const { start, end } = getDefaultDates("daily");
    setStartDate(start);
    setEndDate(end);
  };

  const loading = isLoading || isFetching;

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: "8px",
    border: `1px solid ${isDarkMode ? "#333333" : "#cbd5e0"}`,
    backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
    color: isDarkMode ? "#e0e0e0" : "inherit",
    fontSize: "13px",
    outline: "none",
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
          User Registered Graph
        </h2>
      </Box>

      {/* Filter Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          style={inputStyle}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
          <span style={{ color: isDarkMode ? "#a0a0a0" : "#666", fontSize: "13px" }}>to</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
        </Box>

        {(startDate || endDate || type !== "daily") && (
          <button className="reset-button" onClick={handleReset} style={{ borderRadius: "8px" }}>
            Reset
          </button>
        )}
      </Box>

      {/* Chart Area */}
      {loading ? (
        <Box
          sx={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
        </Box>
      ) : graphData.length === 0 ? (
        <Box
          sx={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#f9fafb",
            borderRadius: "8px",
            color: isDarkMode ? "#a0a0a0" : "#999",
            fontSize: "15px",
          }}
        >
          No data available
        </Box>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
          <Box
            sx={{
              minWidth: 500,
              maxWidth:
                graphData.length <= 4
                  ? "100%"
                  : graphData.length <= 8
                    ? "100%"
                    : graphData.length <= 15
                      ? "100%"
                      : graphData.length * 45,
              width: "100%",
              margin: "0 auto",
            }}
          >
            <BarChart
              height={400}
              series={[
                { data: iosCounts, label: "iOS", color: "#5174c0ff", stack: "total" },
                { data: androidCounts, label: "Android", color: "#ff9040ff", stack: "total" },
              ]}
              xAxis={[
                {
                  data: xAxisLabels,
                  scaleType: "band",
                  tickLabelStyle: {
                    angle: graphData.length > 10 ? 45 : 0,
                    textAnchor: graphData.length > 10 ? "start" : "middle",
                    fontSize: 12,
                  },
                  barGapRatio: 0.3,
                  barCategoryGapRatio: 0.5,
                },
              ]}
              yAxis={[{}]}
              slots={{
                axisContent: ({ axisValue, dataIndex, series }) => (
                  <CustomAxisTooltip
                    axisValue={axisValue}
                    dataIndex={dataIndex}
                    series={Object.values(series)}
                    isDarkMode={isDarkMode}
                  />
                ),
              }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: 0,
                  itemMarkWidth: 16,
                  itemMarkHeight: 10,
                  markGap: 8,
                  itemGap: 10,
                  labelStyle: {
                    fontSize: 13,
                    fill: isDarkMode ? "#e0e0e0" : "#333",
                    fontWeight: 500,
                  },
                },
              }}
              sx={{
                ".MuiChartsAxis-tickLabel": { strokeWidth: "0.4", fill: isDarkMode ? "#a0a0a0" : "#666" },
                ".MuiChartsAxis-line": { stroke: isDarkMode ? "#555555" : "#666", strokeWidth: 1 },
                ".MuiChartsAxis-tick": { stroke: isDarkMode ? "#555555" : "#666", strokeWidth: 1 },
              }}
              margin={{ left: 70, right: 30, top: 40, bottom: graphData.length > 10 ? 80 : 40 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserRegisteredGraphInline;
