// import React, { useState, useEffect } from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import Box from "@mui/material/Box";
// import { useGetRechargeGraphListQuery } from "../../../_store/api";
// import { Atom } from "react-loading-indicators";

// export default function RevenueChart() {
//   const [data, setData] = useState([]);

//   // UI filter state (temporary values before applying)
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     granularity: "",
//     platform: "",
//   });

//   // Applied filter state (actual params sent to API)
//   const [appliedFilters, setAppliedFilters] = useState({
//     startDate: "",
//     endDate: "",
//     granularity: "",
//     platform: "",
//   });

//   // Pass applied filters to the API query
//   const { data: fetchData, isLoading } = useGetRechargeGraphListQuery({
//     granularity: appliedFilters.granularity,
//     startDate: appliedFilters.startDate,
//     endDate: appliedFilters.endDate,
//     platform: appliedFilters.platform,
//   });

//   useEffect(() => {
//     if (fetchData?.data) {
//       setData(fetchData.data);
//     }
//   }, [fetchData]);

//   // Handle date change (only updates UI state)
//   const handleDateChange = (dateType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [dateType]: value,
//     }));
//   };

//   // Handle granularity change (only updates UI state)
//   const handleGranularityChange = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       granularity: e.target.value,
//     }));
//   };

//   // Handle platform change (only updates UI state)
//   const handlePlatformChange = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       platform: e.target.value,
//     }));
//   };

//   // Apply filters - updates the API params
//   const handleApply = () => {
//     setAppliedFilters({
//       startDate: filters.startDate,
//       endDate: filters.endDate,
//       granularity: filters.granularity,
//       platform: filters.platform,
//     });
//   };

//   // Reset filters - clears both UI and API params
//   const handleReset = () => {
//     const resetValues = {
//       startDate: "",
//       endDate: "",
//       granularity: "",
//       platform: "",
//     };
//     setFilters(resetValues);
//     setAppliedFilters(resetValues);
//   };

//   // Transform data for the bar chart
//   const transformedData = data.map((item) => ({
//     android: parseFloat(item?.platforms?.["1"] || 0),
//     iOS: parseFloat(item?.platforms?.["2"] || 0),
//   }));

//   // Extract data for each series
//   const androidData = transformedData.map((item) => item.android);
//   const iOSData = transformedData.map((item) => item.iOS);

//   // Use labels from API response
//   const xAxisLabels = data.map((item) => item.label);

//   if (isLoading) {
//     return (
//       <span className="loadPage">
//         <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
//       </span>
//     );
//   }

//   const categoryGapRatio = xAxisLabels.length < 5 ? 0.98 : 0.6;

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <h2 style={{ margin: 0, color: "var(--dashboard-heading-color)", fontWeight: 700 }}>Recharge</h2>
//       </Box>
//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           gap: 2,
//         }}
//       >
//         <div style={{ width: "75%", overflowX: "auto" }}>
//           <Box
//             sx={{
//               width: "100%",
//               margin: "0 auto",
//             }}
//           >
//             <BarChart
//               height={400}
//               series={[
//                 {
//                   data: androidData,
//                   label: "Android",
//                   stack: "total",
//                   color: "#5174c0ff",
//                 },
//                 {
//                   data: iOSData,
//                   label: "iOS",
//                   stack: "total",
//                   color: "#ff9040ff",
//                 },
//               ]}
//               xAxis={[
//                 {
//                   data: xAxisLabels,
//                   scaleType: "band",
//                   tickLabelStyle: {
//                     angle: 0,
//                     textAnchor: "middle",
//                   },
//                   categoryGapRatio: categoryGapRatio,
//                   barGapRatio: 0,
//                 },
//               ]}
//               slotProps={{
//                 legend: {
//                   direction: "row",
//                   position: { vertical: "top", horizontal: "middle" },
//                   padding: 0,
//                   itemMarkWidth: 20,
//                   itemMarkHeight: 10,
//                   markGap: 8,
//                   itemGap: 15,
//                   labelStyle: {
//                     fontSize: 12,
//                     fill: "#666",
//                   },
//                 },
//                 bar: {
//                   width: 20,
//                 },
//               }}
//               sx={{
//                 ".MuiChartsAxis-tickLabel": {
//                   strokeWidth: "0.2",
//                   fill: "#666",
//                 },
//                 ".MuiChartsAxis-line": {
//                   stroke: "#333",
//                   strokeWidth: 0.5,
//                 },
//                 ".MuiChartsAxis-tick": {
//                   stroke: "#333",
//                   strokeWidth: 1,
//                 },
//                 "& .MuiBarElement-root": {
//                   width: "25px !important",
//                 },
//               }}
//               margin={{ left: 100, right: 100, top: 40, bottom: 80 }}
//               barLabel={false}
//               disableAxisListener
//             />
//           </Box>
//         </div>
//         <div className="filter-section" style={{ width: "25%" }}>
//           <div className="filter-section-title">Date Range</div>
//           <div className="date-inputs">
//             <div className="date-input-group">
//               <label htmlFor="startDate">Start Date</label>
//               <input
//                 type="date"
//                 id="startDate"
//                 className="date-input"
//                 value={filters.startDate}
//                 onChange={(e) => handleDateChange("startDate", e.target.value)}
//               />
//             </div>
//             <div className="date-input-group">
//               <label htmlFor="endDate">End Date</label>
//               <input
//                 type="date"
//                 id="endDate"
//                 className="date-input"
//                 value={filters.endDate}
//                 onChange={(e) => handleDateChange("endDate", e.target.value)}
//                 min={filters.startDate}
//               />
//             </div>
//           </div>
//           <div className="filter-row"></div>
//           <div className="filter-section">
//             <div className="filter-section-title">Granularity</div>
//             <select
//               value={filters.granularity}
//               onChange={handleGranularityChange}
//               style={{
//                 padding: "8px 12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "white",
//                 fontSize: "14px",
//                 cursor: "pointer",
//               }}
//               className="filter-dropdown"
//             >
//               <option value="">Current Month (Daily)</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//           </div>

//           {/* <div className="filter-row"></div> */}
//           <div className="filter-section">
//             <div className="filter-section-title">Group By</div>
//             <select
//               value={filters.platform}
//               onChange={handlePlatformChange}
//               style={{
//                 padding: "8px 12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "white",
//                 fontSize: "14px",
//                 cursor: "pointer",
//               }}
//               className="filter-dropdown"
//             >
//               <option value="">Select Type</option>
//               <option value={0}>User</option>
//               <option value={1}>Admin</option>
//               <option value={2}>Internal</option>
//               <option value={3}>External</option>
//             </select>
//           </div>

//           {/* Action Buttons */}
//           <div className="filter-actions" style={{ width: "max-content" }}>
//             <button className="apply-button" onClick={handleApply}>
//               Apply Filters
//             </button>
//             <button className="reset-button" onClick={handleReset}>
//               Reset
//             </button>
//           </div>
//         </div>
//       </Box>
//     </Box>
//   );
// }

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
import { useTheme } from "../../../_context/ThemeContext";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const androidValue = payload[0]?.value || 0;
    const iOSValue = payload[1]?.value || 0;
    const total = androidValue + iOSValue;

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
            borderTop: "1px solid var(--dashboard-card-border)",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>
              Total:{" "}
            </span>
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

export default function RevenueChart() {
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
  const chartData = data?.map((item) => ({
    label: item.label,
    Android: parseFloat(item?.platforms?.["1"] || 0),
    iOS: parseFloat(item?.platforms?.["2"] || 0),
  }));

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
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>Recharge</h2>
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
          <BarChart data={chartData} margin={{ left: 20, right: 20, top: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 12 }} stroke={axisStroke} tickLine={{ stroke: axisStroke }} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} stroke={axisStroke} tickLine={{ stroke: axisStroke }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: "10px" }} iconType="rect" iconSize={16} />
            <Bar dataKey="Android" stackId="stack" fill="#5174c0ff" barSize={25} />
            <Bar dataKey="iOS" stackId="stack" fill="#ff9040ff" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
