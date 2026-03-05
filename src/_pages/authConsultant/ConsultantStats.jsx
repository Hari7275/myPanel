import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetConsultantStatsQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
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
  total: "#A3BFFA",
  active: "#BAEDBD",
  inactive: "#FDE68A",
  verification_pending: "#FED7AA",
  blocked: "#FCA5A5",
  verification_rejected: "#E9D5FF",
  account_deleted: "#D1D5DB",
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

const StatCard = ({ label, value, bgcolor, onClick }) => (
  <div
    className="dashboard-sub-card consultant-stat-card"
    style={{
      backgroundColor: bgcolor,
      boxShadow: "none",
      cursor: onClick ? "pointer" : "default",
    }}
    onClick={onClick}
  >
    <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
      {label}
    </span>
    <span style={{ fontSize: "28px", fontWeight: "700", color: "#111827" }}>
      {value}
    </span>
  </div>
);

const StatsSection = ({ title, color, stats, route, navigate }) => (
  <div className="consultant-stats-section">
    <h3 className="consultant-stats-section-title" style={{ borderLeftColor: color }}>
      {title}
    </h3>
    <div className="consultant-stats-grid">
      {Object.entries(statLabels).map(([key, label]) => (
        <StatCard
          key={key}
          label={label}
          value={stats?.[key] ?? 0}
          bgcolor={statColors[key]}
          onClick={
            route
              ? () => navigate(`${route}?status=${statToAuthStatus[key]}`)
              : undefined
          }
        />
      ))}
    </div>
  </div>
);

const ConsultantStats = () => {
  const navigate = useNavigate();
  const { data: fetchData, isLoading, error } = useGetConsultantStatsQuery();

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
        >
          Back
        </Button>
        <h2>Consultant Stats</h2>
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
          />
        ))}
      </div>
    </div>
  );
};

export default ConsultantStats;
