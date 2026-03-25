import React, { useState } from "react";
import { Users, AlertTriangle } from "lucide-react";
import Button from "@mui/material/Button";
import ConsultantRegisteredGraphInline from "../authConsultant/ConsultantRegisteredGraphInline";
import ConsultantStats from "../authConsultant/ConsultantStats";
import NoOrderConsultantListNew from "../authConsultant/NoOrderConsultantListNew";
import UserOverview from "./UserOverview";
import ConsltantOverview from "./consultantOverview/ConsultantOverview";
import TrafficConsultant from "./TrafficConsultant";
import TopActiveConsultants from "./topActiveConsultants/TopActiveConsultants";
import "./OnboardingAssociateDashboard.css";

const OnboardingAssociateDashboard = () => {
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
          variant={activeView === "consultants" ? "contained" : "outlined"}
          onClick={() => setActiveView("consultants")}
          startIcon={<Users size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Consultants
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

      {activeView === "consultants" && (
        <div className="oa-overview-content">
          <ConsultantRegisteredGraphInline />
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

export default OnboardingAssociateDashboard;
