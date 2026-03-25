import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BarChart3,
  AlertTriangle,
  IndianRupee,
  LayoutDashboard,
  Users,
  UserRound,
} from "lucide-react";
import Button from "@mui/material/Button";
import { useTheme } from "../../_context/ThemeContext";
import {
  useGetFluteIncomeQuery,
  useGetFluteIncomeByConsultantsQuery,
  useGetFluteIncomeByUsersQuery,
  useGetConsultantIncomeQuery,
  useGetConsultantIncomeBySessionQuery,
  useGetFluteRefundToUserQuery,
  useGetConsultantPayoutAmountQuery,
} from "../../_store/api";
import RechargeGraph from "./RechargeGraph";
import { Atom } from "react-loading-indicators";
import UserOverview from "./UserOverview";
import ConsltantOverview from "./consultantOverview/ConsultantOverview";
import TrafficConsultant from "./TrafficConsultant";
import TopActiveConsultants from "./topActiveConsultants/TopActiveConsultants";
import RevenueByLocation from "./revenueByLocation/RevenueByLocation";
import usePermissions from "../../_components/reuseComponents/permission/EmpPermission";
import "./OnboardingAssociateDashboard.css";

// Lazy load heavy tab components
const ConsultantRegisteredGraphInline = lazy(() => import("../authConsultant/ConsultantRegisteredGraphInline"));
const ConsultantStats = lazy(() => import("../authConsultant/ConsultantStats"));
const NoOrderConsultantListNew = lazy(() => import("../authConsultant/NoOrderConsultantListNew"));
const UserRegisteredGraphInline = lazy(() => import("../users/list/UserRegisteredGraphInline"));
const EarningByBarChart = lazy(() => import("./earningByBarChart/EarningByBarChart"));

export const CategoryCard = ({ link, label, price, bgcolor }) => (
  <div>
    <div
      className="card dashboard-card"
      style={{ backgroundColor: bgcolor, boxShadow: "none", margin: "20px" }}
    >
      <span style={{ fontSize: "20px", fontWeight: "600", color: "#5a5a72" }}>{label}</span>
      <span style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e" }}>₹ {price}</span>
    </div>
  </div>
);

const TabLoader = ({ isDarkMode }) => (
  <span className="loadPage">
    <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
  </span>
);

const SuperadminDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState("overview");
  const permissions = usePermissions();

  // Only fetch earnings data when earnings tab is active
  const skipEarnings = activeView !== "earnings";
  const { data: fluteIncome } = useGetFluteIncomeQuery(undefined, { skip: skipEarnings });
  const { data: fluteIncomeByConslt } = useGetFluteIncomeByConsultantsQuery(undefined, { skip: skipEarnings });
  const { data: fluteIncomeByUsers } = useGetFluteIncomeByUsersQuery(undefined, { skip: skipEarnings });
  const { data: consultantIncome } = useGetConsultantIncomeQuery(undefined, { skip: skipEarnings });
  const { data: consultantIncomeSession } = useGetConsultantIncomeBySessionQuery(undefined, { skip: skipEarnings });
  const { data: fluteRefToUsers } = useGetFluteRefundToUserQuery(undefined, { skip: skipEarnings });
  const { data: consltPayoutInc } = useGetConsultantPayoutAmountQuery(undefined, { skip: skipEarnings });

  const fluteEarning = fluteIncome?.data || [];
  const fluteIncByConslt = fluteIncomeByConslt?.data || [];
  const fluteIncByUsers = fluteIncomeByUsers?.data || [];
  const consultantEarning = consultantIncome?.data || [];
  const consultantEarningSession = consultantIncomeSession?.data || [];
  const fluteRefToUser = fluteRefToUsers?.data || [];
  const consltPayoutIncome = consltPayoutInc?.data || [];

  return (
    <div className="oa-dashboard">
      {/* Navigation Buttons */}
      <div className="oa-actions">
        <Button
          variant={activeView === "overview" ? "contained" : "outlined"}
          onClick={() => setActiveView("overview")}
          startIcon={<LayoutDashboard size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Overview
        </Button>
        <Button
          variant={activeView === "earnings" ? "contained" : "outlined"}
          onClick={() => setActiveView("earnings")}
          startIcon={<IndianRupee size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Earnings
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
          variant={activeView === "users" ? "contained" : "outlined"}
          onClick={() => setActiveView("users")}
          startIcon={<UserRound size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Users
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
        <Button
          variant={activeView === "bar-chart" ? "contained" : "outlined"}
          onClick={() => setActiveView("bar-chart")}
          startIcon={<BarChart3 size={16} />}
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Bar Chart
        </Button>
      </div>

      {/* Overview Tab - loaded eagerly */}
      {activeView === "overview" && (
        <div className="oa-overview-content">
          {permissions?.["Dashboard"]?.includes("view_recharge") && (
            <RechargeGraph />
          )}

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
            <RevenueByLocation />
          </div>
        </div>
      )}

      {/* Earnings Tab - APIs fetched only when active */}
      {activeView === "earnings" && (
        <div className="oa-overview-content">
          <div className="dashboard-main-card">
            <div className="dashboard-grid">
              {fluteEarning.map((item) => (
                <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
              ))}
            </div>
          </div>

          {fluteIncByConslt.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Flute Income by Consultants</h2>
              <div className="dashboard-grid">
                {fluteIncByConslt.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}

          {fluteIncByUsers.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Flute Income by Users</h2>
              <div className="dashboard-grid">
                {fluteIncByUsers.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}

          {consultantEarning.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Consultant Income by Order</h2>
              <div className="dashboard-grid">
                {consultantEarning.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}

          {fluteRefToUser.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Refund Amount to Users</h2>
              <div className="dashboard-grid">
                {fluteRefToUser.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}

          {consultantEarningSession.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Consultant Income by Session</h2>
              <div className="dashboard-grid">
                {consultantEarningSession.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}

          {consltPayoutIncome.length > 0 && (
            <div className="dashboard-main-card">
              <h2 className="dashboard-heading">Consultants Payout Amount</h2>
              <div className="dashboard-grid">
                {consltPayoutIncome.map((item) => (
                  <CategoryCard key={item.title} label={item.name} price={item.value || 0} bgcolor={item.color} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lazy-loaded tabs */}
      {activeView === "consultants" && (
        <Suspense fallback={<TabLoader isDarkMode={isDarkMode} />}>
          <div className="oa-overview-content">
            <ConsultantRegisteredGraphInline />
            <ConsultantStats hideBackButton />
          </div>
        </Suspense>
      )}

      {activeView === "users" && (
        <Suspense fallback={<TabLoader isDarkMode={isDarkMode} />}>
          <div className="oa-overview-content">
            <UserRegisteredGraphInline />
            <div className="oa-grid-2">
              <div className="dashboard-card-style">
                <UserOverview />
              </div>
            </div>
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

      {activeView === "bar-chart" && (
        <Suspense fallback={<TabLoader isDarkMode={isDarkMode} />}>
          <div className="oa-full-section">
            <EarningByBarChart />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default SuperadminDashboard;
