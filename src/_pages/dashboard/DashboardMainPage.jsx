import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../_store/slices/pageTitleSlice";
import usePermissions from "../../_components/reuseComponents/permission/EmpPermission";
import SuperadminDashboard from "./SuperadminDashboard";
import AdminDashboard from "./AdminDashboard";
import OnboardingAssociateDashboard from "./OnboardingAssociateDashboard";
import DeveloperDashboard from "./DeveloperDashboard";
import OnboardingManagerDashboard from "./OnboardingManagerDashboard";
import OnboardingExecutiveDashboard from "./OnboardingExecutiveDashboard";

const DASHBOARD_COMPONENTS = [
  { permission: "view_dashboard_superadmin", component: SuperadminDashboard },
  { permission: "view_dashboard_admin", component: AdminDashboard },
  { permission: "view_dashboard_onboarding_associate", component: OnboardingAssociateDashboard },
  { permission: "view_dashboard_developer", component: DeveloperDashboard },
  { permission: "view_dashboard_onboarding_manager", component: OnboardingManagerDashboard },
  { permission: "view_dashboard_onboarding_executive", component: OnboardingExecutiveDashboard },
];

const DashboardMainPage = () => {
  const dispatch = useDispatch();
  const permissions = usePermissions();
  const dashboardPermissions = permissions?.["Dashboard"] || [];

  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
  }, []);

  const matched = DASHBOARD_COMPONENTS.find(({ permission }) =>
    dashboardPermissions.includes(permission)
  );
  const DashboardComponent = matched?.component || SuperadminDashboard;

  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent"></div>
        <DashboardComponent />
      </div>
    </>
  );
};

export default DashboardMainPage;
