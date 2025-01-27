import React from "react";

import { Routes, Route } from "react-router-dom";
import Navbar from "./_layouts/Navbar";
import Sidebar from "./_layouts/Sidebar";
import { login } from "./_store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
// import LoginForm from "./commonComponents/LoginForm";
import LoginForm from "./_pages/loginPage/LoginForm";
import LogoutPopup from "./_pages/loginPage/LogoutPopup";
import UserListingTable from "./_pages/users/list/UserListingTable";

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

import UserProfileOptions from "./_pages/masterComponents/userInterests/userProfileOption/UserProfileOptions";
import UserPassionOption from "./_pages/masterComponents/userInterests/userPassionOption/UserPassionOption";
import PromptQuestionTable from "./_pages/masterComponents/userInterests/userPromptQuestion/PromptQuestionTable";
import UserDesiresListing from "./_pages/masterComponents/userInterests/userDesires/UserDesiresListing";

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

// QD TRIPS
import QdList from "./_pages/masterComponents/QDTrips/QdList";

// dashboard
import DashboardMainPage from "./_pages/dashboard/DashboardMainPage";

// payment services

import DatingProducts from "./_pages/payments/datingProducts/DatingProducts";
import FeaturesList from "./_pages/payments/features/FeaturesList";
import PaymentTransactionsList from "./_pages/payments/paymentTransactions/PaymentTransactionsList";
import RechargePlansList from "./_pages/payments/rechargePlans/RechargePlansList";
import SubscriptionPlansList from "./_pages/payments/subscriptionPlans/SubscriptionPlansList";
import ConsultantPayout from "./_pages/payments/payoutRequest/ConsultantPayout";
import ConsultantPayoutHistory from "./_pages/payments/payoutRequest/ConsultantPayoutHistory";

// NotificationBell

import NotificationBell from "./_layouts/NotificationBell";
import ConsultantNotice from "./_pages/meta-data/consultantNotice/ConsultantNotice";
import DashboardBannerList from "./_pages/meta-data/dashboardBanner/DashboardBannerList";
import CouponListing from "./_pages/payments/coupons/CouponListing";

import { Navigate } from "react-router-dom";
import FluteEarning from "./_pages/dashboard/fluteEarning/FluteEarning";

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
          <Route path="dashboard" element={<DashboardMainPage />} />
          <Route path="dashboard/fluteEarning" element={<FluteEarning />} />

          <Route path="/user" element={<UserListingTable />} />
          <Route path="coaches" element={<CoachListingTable />} />
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
          {/* ****************************************** payment services ************************************** */}
          <Route path="dating-products" element={<DatingProducts />} />
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
        </Routes>
      </section>
    </div>
  </div>
);

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* <Route path="/" element={<LoginForm />} /> */}

      <Route path="/" element={<LoginForm dispatch={dispatch} />} />
      <Route path="logout" element={<LogoutPopup />} />
      {/* <Route path="*" element={<Layout />} /> */}

      <Route
        path="*"
        element={
          <PrivateRoute
            element={<Layout />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
    </Routes>
  );
}

export default App;
