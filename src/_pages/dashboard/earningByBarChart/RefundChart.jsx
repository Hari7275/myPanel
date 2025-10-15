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
import { useGetRechargeGraphListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const androidValue = payload[0]?.value || 0;
    const iOSValue = payload[1]?.value || 0;
    const total = androidValue + iOSValue;

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
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#5174c0ff",
              marginRight: "8px",
              borderRadius: "2px",
            }}
          />
          <span style={{ fontSize: "13px" }}>Android: </span>
          <span
            style={{ fontWeight: "bold", marginLeft: "4px", fontSize: "13px" }}
          >
            {androidValue.toFixed(2)}
          </span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#ff9040ff",
              marginRight: "8px",
              borderRadius: "2px",
            }}
          />
          <span style={{ fontSize: "13px" }}>iOS: </span>
          <span   
            style={{ fontWeight: "bold", marginLeft: "4px", fontSize: "13px" }}
          >
            {iOSValue.toFixed(2)}
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>
              Total:{" "}
            </span>
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

export default function RefundChart() {
  const [data, setData] = useState([]);

  // UI filter state (temporary values before applying)
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    granularity: "",
    platform: "",
  });

  // Applied filter state (actual params sent to API)
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    granularity: "",
    platform: "",
  });

  // Pass applied filters to the API query
  const { data: fetchData, isLoading } = useGetRechargeGraphListQuery({
    granularity: appliedFilters.granularity,
    startDate: appliedFilters.startDate,
    endDate: appliedFilters.endDate,
    platform: appliedFilters.platform,
  });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // Handle date change (only updates UI state)
  const handleDateChange = (dateType, value) => {
    setFilters((prev) => ({
      ...prev,
      [dateType]: value,
    }));
  };

  // Handle granularity change (only updates UI state)
  const handleGranularityChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      granularity: e.target.value,
    }));
  };

  // Handle platform change (only updates UI state)
  const handlePlatformChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      platform: e.target.value,
    }));
  };

  // Apply filters - updates the API params
  const handleApply = () => {
    setAppliedFilters({
      startDate: filters.startDate,
      endDate: filters.endDate,
      granularity: filters.granularity,
      platform: filters.platform,
    });
  };

  // Reset filters - clears both UI and API params
  const handleReset = () => {
    const resetValues = {
      startDate: "",
      endDate: "",
      granularity: "",
      platform: "",
    };
    setFilters(resetValues);
    setAppliedFilters(resetValues);
  };

  // Transform data for Recharts format
  const chartData = data.map((item) => ({
    label: item.label,
    Android: parseFloat(item?.platforms?.["1"] || 0),
    iOS: parseFloat(item?.platforms?.["2"] || 0),
  }));

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
        <h2 style={{ margin: 0 }}>Recharge</h2>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <div style={{ width: "75%", overflowX: "auto" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ left: 20, right: 20, top: 40, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#666", fontSize: 12 }}
                stroke="#333"
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: "#666", fontSize: 12 }}
                stroke="#333"
                tickLine={{ stroke: "#333" }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                }}
                iconType="rect"
                iconSize={20}
              />
              <Bar
                dataKey="Android"
                stackId="stack"
                fill="#5174c0ff"
                barSize={25}
              />
              <Bar
                dataKey="iOS"
                stackId="stack"
                fill="#ff9040ff"
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="filter-section" style={{ width: "25%" }}>
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
          <div className="filter-row"></div>
          <div className="filter-section">
            <div className="filter-section-title">Granularity</div>
            <select
              value={filters.granularity}
              onChange={handleGranularityChange}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
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
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
              className="filter-dropdown"
            >
              <option value="">Select Type</option>
              <option value={0}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>

          {/* Action Buttons */}
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
