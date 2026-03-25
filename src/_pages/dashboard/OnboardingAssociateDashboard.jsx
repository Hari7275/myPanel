import React, { lazy, Suspense, useState } from "react";
import { Users, AlertTriangle } from "lucide-react";
import Button from "@mui/material/Button";
import { Atom } from "react-loading-indicators";
import { useTheme } from "../../_context/ThemeContext";
import UserOverview from "./UserOverview";
import ConsltantOverview from "./consultantOverview/ConsultantOverview";
import TrafficConsultant from "./TrafficConsultant";
import TopActiveConsultants from "./topActiveConsultants/TopActiveConsultants";
import "./OnboardingAssociateDashboard.css";

const ConsultantRegisteredGraphInline = lazy(() => import("../authConsultant/ConsultantRegisteredGraphInline"));
const ConsultantStats = lazy(() => import("../authConsultant/ConsultantStats"));
const NoOrderConsultantListNew = lazy(() => import("../authConsultant/NoOrderConsultantListNew"));

const TabLoader = ({ isDarkMode }) => (
  <span className="loadPage">
    <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
  </span>
);

const OnboardingAssociateDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="oa-dashboard">
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
          Idle Consultants
        </Button>
      </div>

      {activeView === "overview" && (
        <div className="oa-overview-content">
          <div className="oa-grid-2">
            <div className="dashboard-card-style">
              <UserOverview />
            </div>
            <div className="dashboard-card-style">
              <ConsltantOverview />
            </div>
          </div>
          <TopActiveConsultants />
          <div className="oa-grid-2">
            <TrafficConsultant />
          </div>
        </div>
      )}

      {activeView === "consultants" && (
        <Suspense fallback={<TabLoader isDarkMode={isDarkMode} />}>
          <div className="oa-overview-content">
            <ConsultantRegisteredGraphInline />
            <ConsultantStats hideBackButton />
          </div>
        </Suspense>
      )}

      {activeView === "no-order" && (
        <Suspense fallback={<TabLoader isDarkMode={isDarkMode} />}>
          <div className="oa-full-section">
            <NoOrderConsultantListNew hideBackButton />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default OnboardingAssociateDashboard;
