import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Box from "@mui/material/Box";
import { useGetCouponGraphListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { useTheme } from "../../../_context/ThemeContext";

// ✅ Custom Tooltip (fixed)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload?.length) {
    const total = payload?.reduce((sum, entry) => sum + (entry.value || 0), 0);

    return (
      <div
        style={{
          backgroundColor: "var(--dashboard-card-bg)",
          border: "1px solid var(--dashboard-card-border)",
          borderRadius: "4px",
          padding: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          color: "var(--text-primary)",
        }}
      >
        <div
          style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}
        >
          {label}
        </div>
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                marginRight: "8px",
                borderRadius: "2px",
              }}
            />
            <span style={{ fontSize: "13px" }}>{entry.name}: </span>
            <span
              style={{
                fontWeight: "bold",
                marginLeft: "4px",
                fontSize: "13px",
              }}
            >
              {entry.value.toFixed(2)}
            </span>
          </div>
        ))}
        <div
          style={{
            borderTop: "1px solid var(--dashboard-card-border)",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Total:</span>
            <span
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CouponChart() {
  const { isDarkMode } = useTheme();
  const axisColor = isDarkMode ? "#a0a0a0" : "#666";
  const axisStroke = isDarkMode ? "#555555" : "#333";
  const gridColor = isDarkMode ? "#2a2a2a" : "#f0f0f0";

  const [data, setData] = useState([]);

  // UI filter state (temporary values before applying)
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    granularity: "",
    platform: "",
  });

  // Applied filters (used in API)
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    granularity: "",
    platform: "",
  });

  // ✅ Fetch data from API
  const { data: fetchData, isLoading } = useGetCouponGraphListQuery({
    granularity: appliedFilters.granularity,
    startDate: appliedFilters.startDate,
    endDate: appliedFilters.endDate,
    platform: appliedFilters.platform,
  });

  // ✅ Update chart data when API data changes
  useEffect(() => {
    if (fetchData?.data) {
      const transformed = fetchData?.data?.records?.map((item) => ({
        label: item.label,
        Coupon: parseFloat(item?.coupon || 0),
        Referral: parseFloat(item?.referral || 0),
        Reference: parseFloat(item?.reference || 0),
      }));
      setData(transformed);
    }
  }, [fetchData]);

  // ✅ Handlers
  const handleDateChange = (dateType, value) => {
    setFilters((prev) => ({ ...prev, [dateType]: value }));
  };

  const handleGranularityChange = (e) => {
    setFilters((prev) => ({ ...prev, granularity: e.target.value }));
  };

  const handlePlatformChange = (e) => {
    setFilters((prev) => ({ ...prev, platform: e.target.value }));
  };

  const handleApply = () => setAppliedFilters({ ...filters });
  const handleReset = () => {
    const reset = { startDate: "", endDate: "", granularity: "", platform: "" };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  if (isLoading) {
    return (
      <div className="skeleton-section">
        <div className="skeleton-title skeleton-pulse" />
        <div className="skeleton-card skeleton-pulse" style={{ height: "400px", borderRadius: "8px" }} />
      </div>
    );
  }

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
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>Coupon</h2>
      </Box>

      {/* Filter Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <select value={filters.granularity} onChange={handleGranularityChange} style={inputStyle}>
          <option value="">Current Month (Daily)</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <select value={filters.platform} onChange={handlePlatformChange} style={inputStyle}>
          <option value="">All Platforms</option>
          <option value={0}>User</option>
          <option value={1}>Admin</option>
        </select>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <input type="date" value={filters.startDate} onChange={(e) => handleDateChange("startDate", e.target.value)} style={inputStyle} />
          <span style={{ color: isDarkMode ? "#a0a0a0" : "#666", fontSize: "13px" }}>to</span>
          <input type="date" value={filters.endDate} onChange={(e) => handleDateChange("endDate", e.target.value)} min={filters.startDate} style={inputStyle} />
        </Box>

        <button className="apply-button" onClick={handleApply} style={{ borderRadius: "8px" }}>Apply</button>

        {(filters.startDate || filters.endDate || filters.granularity || filters.platform) && (
          <button className="reset-button" onClick={handleReset} style={{ borderRadius: "8px" }}>Reset</button>
        )}
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ left: 20, right: 20, top: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 12 }} stroke={axisStroke} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} stroke={axisStroke} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: "10px" }} iconType="rect" iconSize={16} />
            <Bar dataKey="Coupon" stackId="stack" fill="#5174c0ff" barSize={25} />
            <Bar dataKey="Referral" stackId="stack" fill="#ff9040ff" barSize={25} />
            <Bar dataKey="Reference" stackId="stack" fill="#EC4899" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
