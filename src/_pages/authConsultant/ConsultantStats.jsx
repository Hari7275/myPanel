import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetConsultantStatsQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import { useTheme } from "../../_context/ThemeContext";
import "./ConsultantStats.css";

const statLabels = {
  total: "Total",
  active: "Active",
  inactive: "Inactive",
  verification_pending: "Verification Pending",
  blocked: "Blocked",
  verification_rejected: "Verification Rejected",
  account_deleted: "Account Deleted",
};

const statColors = {
  total: { light: "#A3BFFA", dark: "#3b4f7a" },
  active: { light: "#BAEDBD", dark: "#2d5a3e" },
  inactive: { light: "#FDE68A", dark: "#5a4d2a" },
  verification_pending: { light: "#FED7AA", dark: "#5a3f2a" },
  blocked: { light: "#FCA5A5", dark: "#5a2d2d" },
  verification_rejected: { light: "#E9D5FF", dark: "#4a3566" },
  account_deleted: { light: "#D1D5DB", dark: "#3a3d42" },
};

// Maps stat key to auth_status query param value
const statToAuthStatus = {
  total: "",
  active: "3",
  inactive: "8",
  verification_pending: "2",
  blocked: "5",
  verification_rejected: "6",
  account_deleted: "7",
};

const sectionConfig = {
  total_consultant: { title: "Total Consultant", color: "#EF4444", route: null },
  listener: { title: "Listener", color: "#F59E0B", route: "/listeners" },
  astrologer: { title: "Astrologer", color: "#6366F1", route: "/astrologer" },
  coach: { title: "Coach", color: "#10B981", route: "/coaches" },
};

const StatCard = ({ label, value, bgcolor, onClick, isDarkMode }) => (
  <div
    className="dashboard-sub-card consultant-stat-card"
    style={{
      backgroundColor: bgcolor,
      boxShadow: "none",
      cursor: onClick ? "pointer" : "default",
    }}
    onClick={onClick}
  >
    <span style={{ fontSize: "14px", fontWeight: "600", color: isDarkMode ? "#d1d5db" : "#374151" }}>
      {label}
    </span>
    <span style={{ fontSize: "28px", fontWeight: "700", color: isDarkMode ? "#f0f0f0" : "#111827" }}>
      {value}
    </span>
  </div>
);

const StatsSection = ({ title, color, stats, route, navigate, isDarkMode }) => (
  <div
    className="consultant-stats-section"
    style={{
      background: isDarkMode ? "rgba(30, 30, 46, 0.65)" : "rgba(255, 255, 255, 0.65)",
      boxShadow: isDarkMode ? "2px 4px 10px rgba(0, 0, 0, 0.25)" : "2px 4px 10px rgba(0, 0, 0, 0.08)",
    }}
  >
    <h3
      className="consultant-stats-section-title"
      style={{ borderLeftColor: color, color: isDarkMode ? "#e0e0e0" : "inherit" }}
    >
      {title}
    </h3>
    <div className="consultant-stats-grid">
      {Object.entries(statLabels).map(([key, label]) => (
        <StatCard
          key={key}
          label={label}
          value={stats?.[key] ?? 0}
          bgcolor={isDarkMode ? statColors[key].dark : statColors[key].light}
          onClick={
            route
              ? () => navigate(`${route}?status=${statToAuthStatus[key]}`)
              : undefined
          }
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  </div>
);

const ConsultantStats = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { data: fetchData, isLoading, error } = useGetConsultantStatsQuery();

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <div style={{ color: isDarkMode ? "#e0e0e0" : "inherit" }}>Error: {error.message}</div>;
  }

  const statsData = fetchData?.data;

  return (
    <div className="consultant-stats-page">
      <div className="consultant-stats-header">
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={18} />}
          sx={{
            color: isDarkMode ? "#a0a0b0" : undefined,
            borderColor: isDarkMode ? "#333350" : undefined,
            "&:hover": isDarkMode ? {
              borderColor: "#a0a0b0",
              backgroundColor: "rgba(255,255,255,0.05)",
            } : undefined,
          }}
        >
          Back
        </Button>
        <h2 style={{ color: isDarkMode ? "#e0e0e0" : "inherit" }}>Consultant Stats</h2>
      </div>

      <div className="consultant-stats-content">
        {Object.entries(sectionConfig).map(([key, config]) => (
          <StatsSection
            key={key}
            title={config.title}
            color={config.color}
            stats={statsData?.[key]}
            route={config.route}
            navigate={navigate}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsultantStats;
