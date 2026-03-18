import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { X } from "lucide-react";
import { Atom } from "react-loading-indicators";
import { useLazyGetConsultantRegisteredGraphQuery } from "../../../_store/api";
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
        background: isDarkMode ? "#1e1e2e" : "#fff",
        border: `1px solid ${isDarkMode ? "#333350" : "#e0e0e0"}`,
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.15)",
        fontSize: 13,
        color: isDarkMode ? "#e0e0e0" : "#333",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        {axisValue}
      </div>
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
            <span style={{ color: isDarkMode ? "#a0a0b0" : "#555" }}>{row.label}</span>
          </div>
          <span style={{ fontWeight: 500 }}>{row.value}</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${isDarkMode ? "#333350" : "#e0e0e0"}`,
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

const AstrologerRegisteredGraph = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [type, setType] = useState("daily");
  const [defaultDates] = useState(() => getDefaultDates("daily"));
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);

  const [fetchGraph, { data: fetchData, isLoading, isFetching }] =
    useLazyGetConsultantRegisteredGraphQuery();

  // Fetch on mount and when filters change
  useEffect(() => {
    if (isOpen) {
      fetchGraph({ type, startDate, endDate, consultant_type: 1 });
    }
  }, [isOpen, type, startDate, endDate, fetchGraph]);

  const graphData = fetchData?.data || [];

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Generate label based on type
  const getLabel = (item) => {
    if (type === "monthly" && item.month) {
      return `${monthNames[item.month - 1]} ${item.year}`;
    }
    if (type === "yearly" && item.year) {
      return `${item.year}`;
    }
    // daily - could be date string
    if (item.date) return item.date;
    return item.label || "";
  };

  // Transform data for bar chart
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Astrologer Registered Graph"
      style={{
        content: {
          maxWidth: "900px",
          width: "90%",
          maxHeight: "90vh",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: isDarkMode ? "#1e1e2e" : "#fff",
          color: isDarkMode ? "#e0e0e0" : "inherit",
          border: isDarkMode ? "1px solid #333350" : "none",
          boxShadow: isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.15)",
          overflow: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
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
          borderBottom: isDarkMode ? "1px solid #333350" : "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Astrologer Registered Graph
        </h2>
        <span
          onClick={onClose}
          style={{
            cursor: "pointer",
            padding: "4px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={22} color={isDarkMode ? "#a0a0b0" : "#666"} />
        </span>
      </Box>

      {/* Filter Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Type Toggle Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {["daily", "monthly", "yearly"].map((t) => (
            <Button
              key={t}
              variant={type === t ? "contained" : "outlined"}
              size="small"
              onClick={() => handleTypeChange(t)}
              sx={{
                textTransform: "capitalize",
                fontWeight: type === t ? 600 : 400,
                borderRadius: "8px",
                px: 2,
                ...(type === t
                  ? {
                    backgroundColor: isDarkMode ? "#4a4a6a" : "#1c2434",
                    color: "#fff",
                    "&:hover": { backgroundColor: isDarkMode ? "#5a5a7a" : "#2d3748" },
                  }
                  : {
                    color: isDarkMode ? "#a0a0b0" : "#1c2434",
                    borderColor: isDarkMode ? "#333350" : "#cbd5e0",
                    "&:hover": {
                      borderColor: isDarkMode ? "#a0a0b0" : "#1c2434",
                      backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "#f7fafc",
                    },
                  }),
              }}
            >
              {t}
            </Button>
          ))}
        </Box>

        {/* Date Range Inputs */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: `1px solid ${isDarkMode ? "#333350" : "#cbd5e0"}`,
              backgroundColor: isDarkMode ? "#16162d" : "#fff",
              color: isDarkMode ? "#e0e0e0" : "inherit",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <span style={{ color: isDarkMode ? "#a0a0b0" : "#666", fontSize: "13px" }}>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: `1px solid ${isDarkMode ? "#333350" : "#cbd5e0"}`,
              backgroundColor: isDarkMode ? "#16162d" : "#fff",
              color: isDarkMode ? "#e0e0e0" : "inherit",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </Box>

        {/* Reset Button */}
        {(startDate || endDate || type !== "daily") && (
          <Button
            variant="text"
            size="small"
            onClick={handleReset}
            sx={{
              textTransform: "none",
              color: "#e53e3e",
              fontSize: "13px",
            }}
          >
            Reset
          </Button>
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
            backgroundColor: isDarkMode ? "#16162d" : "#f9fafb",
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
            backgroundColor: isDarkMode ? "#16162d" : "#f9fafb",
            borderRadius: "8px",
            color: isDarkMode ? "#a0a0b0" : "#999",
            fontSize: "15px",
          }}
        >
          No data available
        </Box>
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
              minWidth: 500,
              maxWidth:
                graphData.length <= 4
                  ? 500
                  : graphData.length <= 8
                    ? 700
                    : graphData.length <= 15
                      ? 850
                      : graphData.length * 45,
              width: "auto",
              margin: "0 auto",
            }}
          >
            <BarChart
              height={400}
              series={[
                {
                  data: iosCounts,
                  label: "iOS",
                  color: "#5174c0ff",
                  stack: "total",
                },
                {
                  data: androidCounts,
                  label: "Android",
                  color: "#ff9040ff",
                  stack: "total",
                },
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
                ".MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.4",
                  fill: isDarkMode ? "#a0a0b0" : "#666",
                },
                ".MuiChartsAxis-line": {
                  stroke: isDarkMode ? "#555570" : "#666",
                  strokeWidth: 1,
                },
                ".MuiChartsAxis-tick": {
                  stroke: isDarkMode ? "#555570" : "#666",
                  strokeWidth: 1,
                },
              }}
              margin={{
                left: 70,
                right: 30,
                top: 40,
                bottom: graphData.length > 10 ? 80 : 40,
              }}
            />
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default AstrologerRegisteredGraph;
