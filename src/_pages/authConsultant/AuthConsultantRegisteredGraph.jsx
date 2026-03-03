import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { X } from "lucide-react";
import { Atom } from "react-loading-indicators";
import { useLazyGetConsultantRegisteredGraphQuery } from "../../_store/api";

const CustomAxisTooltip = ({ series, axisValue, dataIndex }) => {
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
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        fontSize: 13,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6, color: "#333" }}>
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
            <span style={{ color: "#555" }}>{row.label}</span>
          </div>
          <span style={{ fontWeight: 500 }}>{row.value}</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #e0e0e0",
          marginTop: 4,
          paddingTop: 6,
          fontWeight: 600,
          color: "#333",
        }}
      >
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

const AuthConsultantRegisteredGraph = ({ isOpen, onClose }) => {
  const [type, setType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [fetchGraph, { data: fetchData, isLoading, isFetching }] =
    useLazyGetConsultantRegisteredGraphQuery();

  // Fetch on mount and when filters change
  useEffect(() => {
    if (isOpen) {
      fetchGraph({ type, startDate, endDate });
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
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setType("daily");
  };

  const loading = isLoading || isFetching;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Consultant Registered Graph"
      style={{
        content: {
          maxWidth: "900px",
          width: "90%",
          maxHeight: "90vh",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          border: "none",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
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
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Consultant Registered Graph
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
          <X size={22} color="#666" />
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
                    backgroundColor: "#1c2434",
                    "&:hover": { backgroundColor: "#2d3748" },
                  }
                  : {
                    color: "#1c2434",
                    borderColor: "#cbd5e0",
                    "&:hover": {
                      borderColor: "#1c2434",
                      backgroundColor: "#f7fafc",
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
              border: "1px solid #cbd5e0",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <span style={{ color: "#666", fontSize: "13px" }}>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e0",
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
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <Atom color="#1c2434" size="medium" text="" textColor="" />
        </Box>
      ) : graphData.length === 0 ? (
        <Box
          sx={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            color: "#999",
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
                    fill: "#333",
                    fontWeight: 500,
                  },
                },
              }}
              sx={{
                ".MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.4",
                  fill: "#666",
                },
                ".MuiChartsAxis-line": {
                  stroke: "#666",
                  strokeWidth: 1,
                },
                ".MuiChartsAxis-tick": {
                  stroke: "#666",
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

export default AuthConsultantRegisteredGraph;
