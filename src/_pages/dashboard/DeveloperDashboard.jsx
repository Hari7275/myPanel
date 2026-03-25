import React, { useState } from "react";
import { ClipboardList, AlertTriangle } from "lucide-react";
import Button from "@mui/material/Button";
import ConsultantRegisteredGraphInline from "../authConsultant/ConsultantRegisteredGraphInline";
import ConsultantStats from "../authConsultant/ConsultantStats";
import NoOrderConsultantListNew from "../authConsultant/NoOrderConsultantListNew";
import UserOverview from "./UserOverview";
import ConsltantOverview from "./consultantOverview/ConsultantOverview";
import TrafficConsultant from "./TrafficConsultant";
import TopActiveConsultants from "./topActiveConsultants/TopActiveConsultants";
import "./OnboardingAssociateDashboard.css";

const DeveloperDashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="oa-dashboard">
      {/* Action Buttons */}
      <div className="oa-actions">
        <Button
          variant={activeView === "overview" ? "contained" : "outlined"}
          onClick={() => setActiveView("overview")}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Overview
        </Button>
        <Button
          variant={activeView === "stats" ? "contained" : "outlined"}
          onClick={() => setActiveView("stats")}
          startIcon={<ClipboardList size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Consultant Stats
        </Button>
        <Button
          variant={activeView === "no-order" ? "contained" : "outlined"}
          onClick={() => setActiveView("no-order")}
          startIcon={<AlertTriangle size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          {/* No Order Consultants */}
          Idle Consultants
        </Button>
      </div>

      {/* Main Content */}
      {activeView === "overview" && (
        <div className="oa-overview-content">
          {/* Consultant Registered Graph - Full Width */}
          <ConsultantRegisteredGraphInline />

          {/* User & Consultant Overview */}
          <div className="oa-grid-2">
            <div className="dashboard-card-style">
              <UserOverview />
            </div>
            <div className="dashboard-card-style">
              <ConsltantOverview />
            </div>
          </div>

          {/* Top Active Consultants - Full Width */}
          <TopActiveConsultants />

          {/* Traffic */}
          <div className="oa-grid-2">
            <TrafficConsultant />
          </div>
        </div>
      )}

      {activeView === "stats" && (
        <div className="oa-full-section">
          <ConsultantStats hideBackButton />
        </div>
      )}

      {activeView === "no-order" && (
        <div className="oa-full-section">
          <NoOrderConsultantListNew hideBackButton />
        </div>
      )}
    </div>
  );
};

export default DeveloperDashboard;
