import React, { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./_layouts/Navbar";
import Sidebar from "./_layouts/Sidebar";
import { login } from "./_store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./_pages/loginPage/PrivateRoute";
import { ROUTE_PERMISSIONS } from "./_pages/loginPage/permissions";

import "./App.css";
import useAutoLogout from "./_components/reuseComponents/useAutoLogout";
// import LoginForm from "./commonComponents/LoginForm";
import LoginForm from "./_pages/loginPage/LoginForm";
import LogoutPopup from "./_pages/loginPage/LogoutPopup";
import UserListingTable from "./_pages/users/list/UserListingTable";

import ConsultantDeviceInfo from "./_pages/authConsultant/consultant-device-info/ConsultantDeviceInfo";
import AuthConsultantList from "./_pages/authConsultant/AuthConsultantList";
import ConsultantStats from "./_pages/authConsultant/ConsultantStats";
import NoOrderConsultantList from "./_pages/authConsultant/NoOrderConsultantListNew";
import CoachListingTable from "./_pages/coaches/list/CoachListingTable";
import ListenersListingTable from "./_pages/listeners/list/ListenersListingTable";
import AstrologerListingTable from "./_pages/astrologers/list/AstrologerListingTable";
import SubscriptionComponent from "./components/SubscriptionComponent";
import OrderLists from "./_pages/masterComponents/order/OrderLists";
import SessionLists from "./_pages/masterComponents/session/SessionLists";
import UserRechargeLists from "./_pages/masterComponents/userRechargeList/UserRechargeLists";
import RechargeSummary from "./_pages/masterComponents/recharge-summary/RechargeSummary";
import RazorpayRechargeLists from "./_pages/masterComponents/RazorpayRecharge/RazorpayRechargeLists";
import UserSubscriptionLists from "./_pages/masterComponents/userSubscriptionList/UserSubscriptionLists";
import GiftLists from "./_pages/masterComponents/gifts/GiftLists";
import GiftOrderHistory from "./_pages/masterComponents/gifts/GiftOrderHistory";
import CoachProfile from "./_pages/coaches/profile/CoachProfile";
import UsersProfile from "./_pages/users/profile/UsersProfile";
import UntrackedUser from "./_pages/users/untracked-user/UntrackedUser";
import UserDeviceInfo from "./_pages/users/user-device-info/UserDeviceInfo";
import AstrologerProfile from "./_pages/astrologers/profile/AstrologerProfile";
import ListenersProfile from "./_pages/listeners/profile/ListenersProfile";
import FeedbackList from "./_pages/masterComponents/feedback/FeedbackList";
import QDLoaction from "./_pages/masterComponents/QDLocations/QDLoaction";
import UserNotification from "./_pages/masterComponents/notificationManger/UserNotification";
import NotificationTamplateList from "./_pages/masterComponents/notificationManger/notificationTamplate/NotificationTamplateList";
import SendNotification from "./_pages/masterComponents/notificationManger/sendNotification/SendNotification";

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
import AppVersion from "./_pages/meta-data/appVersion/AppVersion";

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
import RefundList from "./_pages/payments/refundList/RefundList";

import { Navigate } from "react-router-dom";
import FluteEarning from "./_pages/dashboard/fluteEarning/FluteEarning";
import EarningByBarChart from "./_pages/dashboard/earningByBarChart/EarningByBarChart";

// ProfileReview

import ProfileReview from "./_pages/profile-review/ProfileReview";
import ConsultantReviewList from "./_pages/profile-review/ConsultantReviewList/ConsultantReviewList";
import CmsSocialIcons from "./_pages/cms-data/cms-social-icon/CmsSocialIcons";
import CmsBlogAuthor from "./_pages/cms-data/cms-blog-author/CmsBlogAuthor";
import CmsBlogList from "./_pages/cms-data/cms-blog/CmsBlogList";

// SupportSection
import SupportSection from "./_pages/masterComponents/support/SupportSection";
import SupportQuestion from "./_pages/masterComponents/support/supportQuestion/SupportQuestion";
import ConsultantSupport from "./_pages/masterComponents/support/consultantSupport/ConsultantSupport";
import ExecutiveList from "./_pages/masterComponents/support/executiveSection/ExecutiveList";
import UserSupportRequest from "./_pages/masterComponents/support/userSupportRequest/UserSupportRequest";
import BlogCount from "./_pages/masterComponents/blogCount/BlogCount";
import AdminActionLog from "./_pages/masterComponents/adminActionLog/AdminActionLog";

// SuperAdmin control
import UnauthorizedPage from "./_pages/loginPage/UnauthorizedPage";

import AdminRole from "./_pages/admin/adminRoles/AdminRole";
import AdminPermission from "./_pages/admin/AdminPermission/AdminPermission";
import PermissionGroup from "./_pages/admin/permissionGroup/PermissionGroup";
import AdminUser from "./_pages/admin/admin_users/AdminUser";
import AssignPermissionToRole from "./_pages/admin/adminRoles/AssignPermissionToRole";
import PayableAmountHistory from "./_pages/payments/payableAmountHistory/PayableAmountHistory";

import AudioCallPage from "./_pages/masterComponents/order/AudioCallPage";
import ChannelMonitorPage from "./_pages/masterComponents/order/ChannelMonitorPage";
import ConsultantRegistrationDocs from "./_pages/coaches/ConsultantRegistrationDocs";
import OnboardingAssign from "./_pages/masterComponents/adminActionLog/onboarding/OnboardingAssign";
import OnboardingAssignedConsultantList from "./_pages/masterComponents/adminActionLog/onboarding/OnboardingAssignedConsultantList";
import OnboardingAssignedUnregisteredConsultantList from "./_pages/masterComponents/adminActionLog/onboarding/OnboardingAssignedUnregisteredConsultantList";

import LeadsLists from "./_pages/masterComponents/marketingLeads/leads/LeadsLists";
import OnboardingAssigneeList from "./_pages/masterComponents/marketingLeads/leads/OnboardingAssigneeList";
import AssignedLeadsToAdminList from "./_pages/masterComponents/marketingLeads/leads/AssignedLeadsToAdminList";

// cms data section
import CmsData from "./_pages/cms-data/CmsData";
import CmsDashboardBanner from "./_pages/cms-data/cms-dashboard-banner/CmsDashboardBanner";
import CmsBlogCategories from "./_pages/cms-data/cms-blog-categories/CmsBlogCategories";
import FAQsList from "./_pages/cms-data/faq-list/FAQsList";
import CmsBuzzList from "./_pages/cms-data/cms-buzz/CmsBuzzList";
import PageManagerList from "./_pages/cms-data/page-manager/PageManagerList";
import PhotoGuidelines from "./_pages/cms-data/cms-photo-guidelines/PhotoGuidelines";
import TheAppPage from "./_pages/cms-data/cms-the-page/TheAppPage";
import TestimonialList from "./_pages/cms-data/cms-testimonial/TestimonialList";
import CmsListenerBanner from "./_pages/cms-data/cms-listener-banner/CmsListenerBanner";

// chat message
import ChatCategory from "./_pages/masterComponents/chatMessage/ChatCategory";

import ObservingList from "./_pages/masterComponents/ObservingList/ObservingList";
import MessageTemplatePage from "./_pages/masterComponents/messageTemplate/MessageTemplatePage";
import ChatSubcategoryList from "./_pages/masterComponents/chatMessage/chatSubCategory/ChatSubcategoryList";

const Layout = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
  <div className="App" style={{ display: "flex", height: "100vh" }}>
    {isNavigating && <div className="route-loading-bar" />}
    <Sidebar />

    <div style={{ flex: 1, minWidth: 0 }} id="main-container">
      <Navbar className="MuiNavbar" />

      <section
        style={{
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          width: "100%",
          backgroundColor: "var(--section-bg)",
        }}
      >
        <Routes>
          {/* <Route path="dashboard" element={<DashboardMainPage />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<DashboardMainPage />}
                requiredPermissions={["view_dashboard_superadmin", "view_dashboard_admin", "view_dashboard_onboarding_associate", "view_dashboard_developer", "view_dashboard_onboarding_manager", "view_dashboard_onboarding_executive"]}
              />
            }
          />
          <Route path="dashboard/fluteEarning" element={<FluteEarning />} />
          <Route
            path="dashboard/fluteBarChart"
            element={<EarningByBarChart />}
          />

          {/* <Route path="/user" element={<UserListingTable />} /> */}

          <Route
            path="/user"
            element={<PrivateRoute element={<UserListingTable />} />}
          />
          <Route path="/user/:userId" element={<UsersProfile />} />

          {/* <Route path="users_Profile" element={<UsersProfile />} /> */}

          <Route path="untracked-user" element={<UntrackedUser />} />
          <Route path="user-device-info" element={<UserDeviceInfo />} />
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
          <Route path="/coaches/:consultantId" element={<CoachProfile />} />
          {/* <Route path="coach-profile" element={<CoachProfile />} /> */}

          <Route
            path="/consultant-device-info"
            element={<ConsultantDeviceInfo />}
          />
          <Route path="auth-consultant" element={<AuthConsultantList />} />
          <Route path="consultant-stats" element={<ConsultantStats />} />
          <Route path="no-order-consultants" element={<NoOrderConsultantList />} />

          <Route path="astrologer" element={<AstrologerListingTable />} />
          <Route
            path="/astrologer/:consultantId"
            element={<AstrologerProfile />}
          />
          {/* <Route path="astrologer_Profile" element={<AstrologerProfile />} /> */}
          <Route path="listeners" element={<ListenersListingTable />} />
          <Route
            path="/listeners/:consultantId"
            element={<ListenersProfile />}
          />
          {/* <Route path="listener_Profile" element={<ListenersProfile />} /> */}

          <Route path="subs-package" element={<SubscriptionComponent />} />
          <Route path="user-recharge" element={<UserRechargeLists />} />
          <Route path="user-recharge-summary" element={<RechargeSummary />} />
          <Route path="razorpay-recharge" element={<RazorpayRechargeLists />} />
          <Route path="user-subscription" element={<UserSubscriptionLists />} />
          <Route path="order" element={<OrderLists />} />
          <Route path="session" element={<SessionLists />} />
          <Route path="gift" element={<GiftLists />} />
          <Route path="gift-history" element={<GiftOrderHistory />} />

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
          <Route path="/user-notification" element={<UserNotification />} />
          <Route
            path="/notification-template"
            element={<NotificationTamplateList />}
          />
          <Route path="/send-notification" element={<SendNotification />} />

          <Route path="/assign-notice" element={<ConsultantNoticeList />} />
          <Route path="/coach-rate" element={<CoachRate />} />
          <Route path="/profile-progress" element={<ProfileProgress />} />
          <Route path="/consultant-commission" element={<CommissionList />} />
          <Route path="/dashboard-order" element={<DashboardOrderList />} />
          <Route path="/app-version" element={<AppVersion />} />

          {/* ****************************************** Cms Data ************************************** */}
          <Route path="/cms-data" element={<CmsData />} />
          <Route
            path="/cms-dashboard-banner"
            element={<CmsDashboardBanner />}
          />
          <Route path="/cms-categories-list" element={<CmsBlogCategories />} />

          <Route path="/cms-social-icons" element={<CmsSocialIcons />} />
          <Route path="/cms-author-list" element={<CmsBlogAuthor />} />
          <Route path="/cms-blog-list" element={<CmsBlogList />} />
          <Route path="/cms-faq-list" element={<FAQsList />} />
          <Route path="/cms-buzz-list" element={<CmsBuzzList />} />
          <Route path="/cms-page-manager" element={<PageManagerList />} />
          <Route
            path="/cms-consultant-photo-guidelines"
            element={<PhotoGuidelines />}
          />
          <Route path="/cms-the-app-page" element={<TheAppPage />} />
          <Route path="/cms-testimonial" element={<TestimonialList />} />
          <Route path="/cms-listener-banner" element={<CmsListenerBanner />} />

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
          <Route path="payable-History" element={<PayableAmountHistory />} />
          <Route path="coupon" element={<CouponListing />} />
          <Route path="refund-list" element={<RefundList />} />
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
          <Route path="consultant-support" element={<ConsultantSupport />} />
          <Route path="Support-executive" element={<ExecutiveList />} />
          <Route path="user-support-request" element={<UserSupportRequest />} />
          <Route path="blog-count" element={<BlogCount />} />
          <Route path="action-log" element={<AdminActionLog />} />
          <Route path="onboarding-assign" element={<OnboardingAssign />} />
          <Route
            path="/onboarding-assign/:adminId"
            element={<OnboardingAssignedConsultantList />}
          />
          <Route
            path="/marketing-leads/onboarding/:adminId"
            element={<AssignedLeadsToAdminList />}
          />
          <Route
            path="/onboarding-assign/unregistered/:adminId"
            element={<OnboardingAssignedUnregisteredConsultantList />}
          />

          <Route path="/leads-list" element={<LeadsLists />} />
          <Route
            path="/marketing-assignee"
            element={<OnboardingAssigneeList />}
          />

          {/* ****************************************SuperAdmin*************************** */}

          <Route path="admin-roles" element={<AdminRole />} />
          <Route path="admin-permission/:id" element={<AdminPermission />} />
          <Route path="admin-permission" element={<PermissionGroup />} />
          <Route path="admin-user" element={<AdminUser />} />

          {/* listent order call */}
          <Route path="/audio-call" element={<AudioCallPage />} />
          <Route path="/channel-monitor" element={<ChannelMonitorPage />} />

          <Route
            path="role-permission/:id"
            element={<AssignPermissionToRole />}
          />

          <Route
            path="consultant-user-notification"
            element={<ObservingList />}
          />

          <Route path="consultant-user-notification" element={<ObservingList />} />
          <Route path="message-template" element={<MessageTemplatePage />} />
          {/* chat message template */}
          <Route path="chat-message" element={<ChatCategory />} />
          <Route path="/chat-message/:id" element={<ChatSubcategoryList />} />
        </Routes>
      </section>
    </div>
  </div>
  );
};

// const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? element : <Navigate to="/" />;
// };

function App() {
  const dispatch = useDispatch();
  useAutoLogout();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("ROUTE_PERMISSIONS.dashboard", ROUTE_PERMISSIONS.dashboard);

  return (
    <Routes>
      {/* <Route path="/" element={<LoginForm />} /> */}

      <Route path="/" element={<LoginForm dispatch={dispatch} />} />
      <Route path="logout" element={<LogoutPopup />} />
      <Route
        path="registration-user"
        element={<ConsultantRegistrationDocs />}
      />
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
