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

// ✅ Custom Tooltip (fixed)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload?.length) {
    const total = payload?.reduce((sum, entry) => sum + (entry.value || 0), 0);

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
            borderTop: "1px solid #ddd",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Total:</span>
            <span
              style={{ fontWeight: "bold", fontSize: "13px", color: "#333" }}
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
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
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
        <h2 style={{ margin: 0 }}>Coupon</h2>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* ✅ Chart Section */}
        <div style={{ width: "75%", overflowX: "auto" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ left: 20, right: 20, top: 40, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#666", fontSize: 12 }}
                stroke="#333"
              />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} stroke="#333" />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                iconType="rect"
                iconSize={20}
              />
              <Bar
                dataKey="Coupon"
                stackId="stack"
                fill="#5174c0ff"
                barSize={25}
              />
              <Bar
                dataKey="Referral"
                stackId="stack"
                fill="#ff9040ff"
                barSize={25}
              />
              <Bar
                dataKey="Reference"
                stackId="stack"
                fill="#EC4899"
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Filters Section */}
        <div className="filter-section" style={{ width: "auto" }}>
          <div className="filter-section-title">Date Range</div>
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                className="date-input"
                value={filters.startDate}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                className="date-input"
                value={filters.endDate}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
                min={filters.startDate}
              />
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Granularity</div>
            <select
              value={filters.granularity}
              onChange={handleGranularityChange}
              className="filter-dropdown"
            >
              <option value="">Current Month (Daily)</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Group By</div>
            <select
              value={filters.platform}
              onChange={handlePlatformChange}
              className="filter-dropdown"
            >
              <option value="">Select Type</option>
              <option value={0}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>

          <div className="filter-actions" style={{ width: "max-content" }}>
            <button className="apply-button" onClick={handleApply}>
              Apply Filters
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </Box>
    </Box>
  );
}
