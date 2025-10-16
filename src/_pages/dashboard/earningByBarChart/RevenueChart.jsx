import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { useGetRechargeGraphListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

export default function RevenueChart() {
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

  // Transform data for the bar chart
  const transformedData = data.map((item) => ({
    android: parseFloat(item?.platforms?.["1"] || 0),
    iOS: parseFloat(item?.platforms?.["2"] || 0),
  }));

  // Extract data for each series
  const androidData = transformedData.map((item) => item.android);
  const iOSData = transformedData.map((item) => item.iOS);

  // Use labels from API response
  const xAxisLabels = data.map((item) => item.label);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  const categoryGapRatio = xAxisLabels.length < 5 ? 0.98 : 0.6;

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
          <Box
            sx={{
              width: "100%",
              margin: "0 auto",
            }}
          >
            <BarChart
              height={400}
              series={[
                {
                  data: androidData,
                  label: "Android",
                  stack: "total",
                  color: "#5174c0ff",
                },
                {
                  data: iOSData,
                  label: "iOS",
                  stack: "total",
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
                  categoryGapRatio: categoryGapRatio,
                  barGapRatio: 0,
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
                  width: 20,
                },
              }}
              sx={{
                ".MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.2",
                  fill: "#666",
                },
                ".MuiChartsAxis-line": {
                  stroke: "#333",
                  strokeWidth: 0.5,
                },
                ".MuiChartsAxis-tick": {
                  stroke: "#333",
                  strokeWidth: 1,
                },
                "& .MuiBarElement-root": {
                  width: "25px !important",
                },
              }}
              margin={{ left: 100, right: 100, top: 40, bottom: 80 }}
              barLabel={false}
              disableAxisListener
            />
          </Box>
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

          {/* <div className="filter-row"></div> */}
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
              <option value={2}>Internal</option>
              <option value={3}>External</option>
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
