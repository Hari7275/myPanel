import React, { useState, useEffect } from "react";
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
import ConsultantRegisteredGraphInline from "../authConsultant/ConsultantRegisteredGraphInline";
import ConsultantStats from "../authConsultant/ConsultantStats";
import NoOrderConsultantListNew from "../authConsultant/NoOrderConsultantListNew";
import UserRegisteredGraphInline from "../users/list/UserRegisteredGraphInline";
import EarningByBarChart from "./earningByBarChart/EarningByBarChart";
import "./OnboardingAssociateDashboard.css";

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

const SuperadminDashboard = () => {
  const { isDarkMode } = useTheme();
  const [fluteEarning, setFluteEarning] = useState([]);
  const [activeView, setActiveView] = useState("overview");

  const { data: fluteIncome, isLoading } = useGetFluteIncomeQuery();
  const { data: fluteIncomeByConslt } = useGetFluteIncomeByConsultantsQuery();
  const { data: fluteIncomeByUsers } = useGetFluteIncomeByUsersQuery();
  const { data: consultantIncome } = useGetConsultantIncomeQuery();
  const { data: consultantIncomeSession } = useGetConsultantIncomeBySessionQuery();
  const { data: fluteRefToUsers } = useGetFluteRefundToUserQuery();
  const { data: consltPayoutInc } = useGetConsultantPayoutAmountQuery();

  const permissions = usePermissions();

  const [fluteIncByConslt, setFluteIncByConslt] = useState([]);
  const [fluteIncByUsers, setFluteIncByUsers] = useState([]);
  const [consultantEarning, setConsultantEarning] = useState([]);
  const [consultantEarningSession, setConsultantEarningSession] = useState([]);
  const [fluteRefToUser, setFluteRefToUser] = useState([]);
  const [consltPayoutIncome, setConsltPayoutIncome] = useState([]);

  useEffect(() => {
    if (fluteIncome?.data) setFluteEarning(fluteIncome.data);
    if (fluteIncomeByConslt?.data) setFluteIncByConslt(fluteIncomeByConslt.data);
    if (fluteIncomeByUsers?.data) setFluteIncByUsers(fluteIncomeByUsers.data);
    if (consultantIncome?.data) setConsultantEarning(consultantIncome.data);
    if (consultantIncomeSession?.data) setConsultantEarningSession(consultantIncomeSession.data);
    if (fluteRefToUsers?.data) setFluteRefToUser(fluteRefToUsers.data);
    if (consltPayoutInc?.data) setConsltPayoutIncome(consltPayoutInc.data);
  }, [fluteIncome, fluteIncomeByConslt, fluteIncomeByUsers, consultantIncome, consultantIncomeSession, fluteRefToUsers, consltPayoutInc]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }




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

      {/* Overview Tab */}
      {activeView === "overview" && (
        <div className="oa-overview-content">
          {/* Recharge Graph - Full Width First Line */}
          {permissions?.["Dashboard"]?.includes("view_recharge") && (
            <RechargeGraph />
          )}

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

          {/* Traffic & Referral */}
          <div className="oa-grid-2">
            <TrafficConsultant />
            <RevenueByLocation />
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {activeView === "earnings" && (
        <div className="oa-overview-content">
          {/* Flute Earnings */}
          <div className="dashboard-main-card">
            <div className="dashboard-grid">
              {fluteEarning.map((item) => (
                <CategoryCard
                  key={item.title}
                  label={item.name}
                  price={item.value}
                  bgcolor={item.color}
                />
              ))}
            </div>
          </div>

          {/* Flute Income by Consultants */}
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

          {/* Flute Income by Users */}
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

          {/* Consultant Income by Order */}
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

          {/* Refund Amount to Users */}
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

          {/* Consultant Income by Session */}
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

          {/* Consultants Payout Amount */}
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

      {/* Consultants Tab */}
      {activeView === "consultants" && (
        <div className="oa-overview-content">
          <ConsultantRegisteredGraphInline />
          <ConsultantStats hideBackButton />
        </div>
      )}

      {/* Users Tab */}
      {activeView === "users" && (
        <div className="oa-overview-content">
          <UserRegisteredGraphInline />
          <div className="oa-grid-2">
            <div className="dashboard-card-style">
              <UserOverview />
            </div>
          </div>
        </div>
      )}

      {/* Idle Consultants Tab */}
      {activeView === "no-order" && (
        <div className="oa-full-section">
          <NoOrderConsultantListNew hideBackButton />
        </div>
      )}

      {/* Bar Chart Tab */}
      {activeView === "bar-chart" && (
        <div className="oa-full-section">
          <EarningByBarChart />
        </div>
      )}

    </div>
  );
};

export default SuperadminDashboard;
