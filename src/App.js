import React from "react";

import { Routes, Route } from "react-router-dom";
import Navbar from "./_layouts/Navbar";
import Sidebar from "./_layouts/Sidebar";
import { login } from "./_store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./_pages/loginPage/PrivateRoute";
import { ROUTE_PERMISSIONS } from "./_pages/loginPage/permissions";

import "./App.css";
// import LoginForm from "./commonComponents/LoginForm";
import LoginForm from "./_pages/loginPage/LoginForm";
import LogoutPopup from "./_pages/loginPage/LogoutPopup";
import UserListingTable from "./_pages/users/list/UserListingTable";

import AuthConsultantList from "./_pages/authConsultant/AuthConsultantList";
import CoachListingTable from "./_pages/coaches/list/CoachListingTable";
import ListenersListingTable from "./_pages/listeners/list/ListenersListingTable";
import AstrologerListingTable from "./_pages/astrologers/list/AstrologerListingTable";
import SubscriptionComponent from "./components/SubscriptionComponent";
import OrderLists from "./_pages/masterComponents/order/OrderLists";
import GiftLists from "./_pages/masterComponents/gifts/GiftLists";
import CoachProfile from "./_pages/coaches/profile/CoachProfile";
import UsersProfile from "./_pages/users/profile/UsersProfile";
import AstrologerProfile from "./_pages/astrologers/profile/AstrologerProfile";
import ListenersProfile from "./_pages/listeners/profile/ListenersProfile";
import FeedbackList from "./_pages/masterComponents/feedback/FeedbackList";
import QDLoaction from "./_pages/masterComponents/QDLocations/QDLoaction";
import CommissionList from "./_pages/astrologers/astrologerCommission/CommissionList";

import UserProfileOptions from "./_pages/masterComponents/userInterests/userProfileOption/UserProfileOptions";
import UserPassionOption from "./_pages/masterComponents/userInterests/userPassionOption/UserPassionOption";
import PromptQuestionTable from "./_pages/masterComponents/userInterests/userPromptQuestion/PromptQuestionTable";
import UserDesiresListing from "./_pages/masterComponents/userInterests/userDesires/UserDesiresListing";

// meta section
import MetaData from "./_pages/meta-data/metaList/MetaData";
import CoachCategory from "./_pages/meta-data/coachCategory/CoachCategory";
import LanguageTable from "./_pages/meta-data/languages/LanguageTable";
import PromotionalCardsTable from "./_pages/meta-data/promotionalCards/PromotionalCardsTable";
import CoachSkills from "./_pages/meta-data/coachSkills/CoachSkills";
import MagazineCategories from "./_pages/meta-data/magazineCards/MagazineCategories";
import ReportReason from "./_pages/meta-data/reportReasons/ReportReason";
import ConsultantServiceRate from "./_pages/meta-data/consultantRate/ConsultantServiceRate";
import MenuOrders from "./_pages/meta-data/menuOrder/MenuOrders";
import CountriesList from "./_pages/meta-data/countryList/CountriesList";
import CoachRate from "./_pages/meta-data/coachRate/CoachRate";
import ProfileProgress from "./_pages/meta-data/consultantProfileProgress/profileProgress";
import DashboardOrderList from "./_pages/meta-data/dashboardOrder/DashboardOrderList";

// QD TRIPS
import QdList from "./_pages/masterComponents/QDTrips/QdList";

// dashboard
import DashboardMainPage from "./_pages/dashboard/DashboardMainPage";

// payment services

import DatingProducts from "./_pages/payments/datingProducts/DatingProducts";
import QdProducts from "./_pages/payments/qdProducts/QdProducts";
import FeaturesList from "./_pages/payments/features/FeaturesList";
import PaymentTransactionsList from "./_pages/payments/paymentTransactions/PaymentTransactionsList";
import RechargePlansList from "./_pages/payments/rechargePlans/RechargePlansList";
import SubscriptionPlansList from "./_pages/payments/subscriptionPlans/SubscriptionPlansList";
import ConsultantPayout from "./_pages/payments/payoutRequest/ConsultantPayout";
import ConsultantPayoutHistory from "./_pages/payments/payoutRequest/ConsultantPayoutHistory";

// NotificationBell

import NotificationBell from "./_layouts/NotificationBell";
import ConsultantNotice from "./_pages/masterComponents/noticeManager/noticeList/ConsultantNotice";
import ConsultantNoticeList from "./_pages/masterComponents/noticeManager/consultantNotice/ConsultantNoticeList";
import DashboardBannerList from "./_pages/meta-data/dashboardBanner/DashboardBannerList";
import CouponListing from "./_pages/payments/coupons/CouponListing";

import { Navigate } from "react-router-dom";
import FluteEarning from "./_pages/dashboard/fluteEarning/FluteEarning";

// ProfileReview

import ProfileReview from "./_pages/profile-review/ProfileReview";
import ConsultantReviewList from "./_pages/profile-review/ConsultantReviewList/ConsultantReviewList";

// SupportSection
import SupportSection from "./_pages/masterComponents/support/SupportSection";
import SupportQuestion from "./_pages/masterComponents/support/supportQuestion/SupportQuestion";
import ExecutiveList from "./_pages/masterComponents/support/executiveSection/ExecutiveList";
import UserSupportRequest from "./_pages/masterComponents/support/userSupportRequest/UserSupportRequest";

// SuperAdmin control
import UnauthorizedPage from "./_pages/loginPage/UnauthorizedPage";

import AdminRole from "./_pages/admin/adminRoles/AdminRole";
import AdminPermission from "./_pages/admin/AdminPermission/AdminPermission";
import PermissionGroup from "./_pages/admin/permissionGroup/PermissionGroup";
import AdminUser from "./_pages/admin/admin_users/AdminUser";
import AssignPermissionToRole from "./_pages/admin/adminRoles/AssignPermissionToRole";

const Layout = () => (
  <div className="App" style={{ display: "flex", height: "100vh" }}>
    <Sidebar />

    <div style={{ width: "100%" }} id="main-container">
      <Navbar className="MuiNavbar" />

      <section
        style={{
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          width: "100%",
          backgroundColor: "#f1f1f9",
        }}
      >
        <Routes>
          {/* <Route path="dashboard" element={<DashboardMainPage />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<DashboardMainPage />}
                requiredPermissions={["view_dashboard"]} // Just the essential permission
              />
            }
          />
          <Route path="dashboard/fluteEarning" element={<FluteEarning />} />

          {/* <Route path="/user" element={<UserListingTable />} /> */}

          <Route
            path="/user"
            element={
              <PrivateRoute
                element={<UserListingTable />}
                requiredPermissions={["view_coaches"]}
              />
            }
          />
          {/* <Route path="coaches" element={<CoachListingTable />} /> */}
          <Route
            path="/coaches"
            element={
              <PrivateRoute
                element={<CoachListingTable />}
                requiredPermissions={ROUTE_PERMISSIONS.coaches}
              />
            }
          />
          <Route path="auth-consultant" element={<AuthConsultantList />} />
          <Route path="listeners" element={<ListenersListingTable />} />
          <Route path="astrologer" element={<AstrologerListingTable />} />

          <Route path="subs-package" element={<SubscriptionComponent />} />
          <Route path="order" element={<OrderLists />} />
          <Route path="gift" element={<GiftLists />} />

          <Route path="coach-profile" element={<CoachProfile />} />
          <Route path="users_Profile" element={<UsersProfile />} />
          <Route path="listener_Profile" element={<ListenersProfile />} />
          <Route path="astrologer_Profile" element={<AstrologerProfile />} />
          {/*    ********************************************************user interest **************************************************************************  */}
          <Route path="user-profile-option" element={<UserProfileOptions />} />
          <Route path="prompt-question" element={<PromptQuestionTable />} />
          <Route path="user-passion" element={<UserPassionOption />} />
          <Route path="user-desire" element={<UserDesiresListing />} />
          {/* *****************************************************meta data*************************************************************************** */}
          <Route path="meta-data" element={<MetaData />} />
          {/* <Route path="coach_metadata" element={<CoachMetaData />} /> */}
          <Route path="coach-category_metadata" element={<CoachCategory />} />
          <Route path="language-metadata" element={<LanguageTable />} />

          <Route
            path="promotional-card-metadata"
            element={<PromotionalCardsTable />}
          />
          <Route
            path="dashboard-banner-metadata"
            element={<DashboardBannerList />}
          />
          <Route path="coach-skills-metadata" element={<CoachSkills />} />
          <Route
            path="magazine-categories-metadata"
            element={<MagazineCategories />}
          />
          <Route path="report-reason" element={<ReportReason />} />
          <Route
            path="/consultant-service-rate"
            element={<ConsultantServiceRate />}
          />
          <Route path="/menu-orders" element={<MenuOrders />} />
          <Route path="countries-list" element={<CountriesList />} />
          <Route path="/consultant-notice" element={<ConsultantNotice />} />
          <Route path="/assign-notice" element={<ConsultantNoticeList />} />
          <Route path="/coach-rate" element={<CoachRate />} />
          <Route path="/profile-progress" element={<ProfileProgress />} />
          <Route path="/consultant-commission" element={<CommissionList />} />
          <Route path="/dashboard-order" element={<DashboardOrderList />} />
          {/* ****************************************** payment services ************************************** */}
          <Route path="dating-products" element={<DatingProducts />} />
          <Route path="qd-products" element={<QdProducts />} />
          <Route path="feature-list" element={<FeaturesList />} />
          <Route
            path="payment-transactions"
            element={<PaymentTransactionsList />}
          />
          <Route path="recharge-plans" element={<RechargePlansList />} />
          <Route
            path="subscriptions-plans"
            element={<SubscriptionPlansList />}
          />
          <Route path="payout-request" element={<ConsultantPayout />} />
          <Route path="payout-History" element={<ConsultantPayoutHistory />} />
          <Route path="coupon" element={<CouponListing />} />
          {/* *************************************************QdList */}

          <Route path="qd-trips" element={<QdList />} />
          <Route path="feedback-list" element={<FeedbackList />} />
          <Route path="qd-location" element={<QDLoaction />} />

          {/* *************************************************QdList */}

          <Route path="notification" element={<NotificationBell />} />

          {/* *************************************************ProfileReview */}

          <Route
            path="profile-review/:consultantId"
            element={<ProfileReview />}
          />
          <Route path="profile-review" element={<ConsultantReviewList />} />

          {/* *************************************************SupportSection */}

          <Route path="user-support" element={<SupportSection />} />
          <Route path="support-question" element={<SupportQuestion />} />
          <Route path="Support-executive" element={<ExecutiveList />} />
          <Route path="user-support-request" element={<UserSupportRequest />} />

          {/* ****************************************SuperAdmin*************************** */}

          <Route path="admin-roles" element={<AdminRole />} />
          <Route path="admin-permission/:id" element={<AdminPermission />} />
          <Route path="admin-permission" element={<PermissionGroup />} />
          <Route path="admin-user" element={<AdminUser />} />

          <Route
            path="role-permission/:id"
            element={<AssignPermissionToRole />}
          />
        </Routes>
      </section>
    </div>
  </div>
);

// const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? element : <Navigate to="/" />;
// };

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("ROUTE_PERMISSIONS.dashboard", ROUTE_PERMISSIONS.dashboard);

  return (
    <Routes>
      {/* <Route path="/" element={<LoginForm />} /> */}

      <Route path="/" element={<LoginForm dispatch={dispatch} />} />
      <Route path="logout" element={<LogoutPopup />} />
      {/* <Route path="*" element={<Layout />} /> */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="*"
        element={
          <PrivateRoute
            element={<Layout />}
            // isAuthenticated={isAuthenticated}
            // requiredPermissions={["access_admin_panel"]}
          />
        }
      />
    </Routes>

    // <Routes>
    //   <Route path="/" element={<LoginForm dispatch={dispatch} />} />
    //   <Route path="/logout" element={<LogoutPopup />} />

    //   {/* Fallback route: render Layout for all other paths */}
    //   <Route path="*" element={<Layout />} />
    // </Routes>
  );
}

export default App;
