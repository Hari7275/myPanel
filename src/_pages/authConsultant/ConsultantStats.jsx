import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetConsultantStatsQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../_context/ThemeContext";
import usePermissions from "../../_components/reuseComponents/permission/EmpPermission";
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

const StatCard = ({ label, value, statKey, onClick }) => (
  <div
    className={`consultant-stat-card cs-stat-card-${statKey}`}
    style={{ cursor: onClick ? "pointer" : "default" }}
    onClick={onClick}
  >
    <span className="cs-stat-label">{label}</span>
    <span className="cs-stat-value">{value}</span>
  </div>
);

const StatsSection = ({ title, color, stats, route, navigate, canNavigate }) => (
  <div className="consultant-stats-section">
    <h3
      className="consultant-stats-section-title"
      style={{ borderLeftColor: color }}
    >
      {title}
    </h3>
    <div className="consultant-stats-grid">
      {Object.entries(statLabels).map(([key, label]) => (
        <StatCard
          key={key}
          label={label}
          value={stats?.[key] ?? 0}
          statKey={key}
          onClick={
            route && canNavigate
              ? () => navigate(`${route}?status=${statToAuthStatus[key]}`)
              : undefined
          }
        />
      ))}
    </div>
  </div>
);

const ConsultantStats = ({ hideBackButton = false }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const permissions = usePermissions();
  const canNavigate = permissions?.["consultant"]?.includes("view_consultant_profile");
  const { data: fetchData, isLoading, error } = useGetConsultantStatsQuery();

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#aaaaaa" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <div className="cs-error-text">Error: {error.message}</div>;
  }

  const statsData = fetchData?.data;

  return (
    <div className="consultant-stats-page">
      <div className="consultant-stats-header">
        {!hideBackButton && (
          <button className="cs-back-btn" onClick={() => navigate(-1)} title="Back">
            <ArrowLeft size={18} />
          </button>
        )}
        <h2 className="cs-page-title">Consultant Stats</h2>
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
            canNavigate={canNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsultantStats;
