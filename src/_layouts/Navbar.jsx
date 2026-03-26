import React, { useState, useEffect } from "react";
import LogoutPopup from "../_pages/loginPage/LogoutPopup";
import NotificationBell from "./NotificationBell";
import { useGetNotificationUnreadCountQuery } from "../_store/api";

import { AppBar, Toolbar, Typography, Stack, Tooltip } from "@mui/material";
import { Sun, Moon, Radio, Eye, Bell, Menu } from "lucide-react";
import { useTheme } from "../_context/ThemeContext";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import usePermissions from "../_components/reuseComponents/permission/EmpPermission";
import { useGetFluteRevenueOnGraphQuery } from "../_store/api";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [count, setCount] = useState(2);
  const { data: fetchData } = useGetNotificationUnreadCountQuery();
  const currentTitle = useSelector(
    (state) => state.pageTitle?.title || "Flute Admin Panel",
  );

  const location = useLocation();
  const permissions = usePermissions();

  const [dateFilter, setDateFilter] = useState("weekly");
  const [revenueData, setRevenueData] = useState([]);

  const hasRevenuePermission =
    permissions?.["Dashboard"]?.includes("view_recharge");

  const { data: fetchRevenueData } = useGetFluteRevenueOnGraphQuery(
    {
      dateFilter,
    },
    {
      // pollingInterval: hasRevenuePermission ? 2 * 60 * 1000 : 0,
      pollingInterval: hasRevenuePermission ? 2 * 60 * 1000 : 0,
      skip: !hasRevenuePermission,
    },
  );

  useEffect(() => {
    if (fetchRevenueData && fetchRevenueData.data) {
      setRevenueData(fetchRevenueData?.data?.at(-1));
    }
  }, [fetchRevenueData]);

  const pathTitleMap = {
    "/user": "User List",
    "/untracked-user": "Guest User Device Info",
    "/user-device-info": "Register User Device Info",
    "/user/:id": "User Details",
    "/coaches": "Coach List",
    "/auth-consultant": "Unregistered Consultant List",
    "/consultant-device-info": "Consultant Device Info",
    "/astrologer": "Astrologer List",
    "/listeners": "Listener List",
    "/dashboard": "Dashboard",
    "/meta-data": "Meta-Data",
    "/profile-review": "Consultant Review List",
    "/astrologer/:id": "Astrologer Details",
    "/listeners/:id": "Listener Details",
    "/coaches/:id": "Coach Details",
    "/notification": "All Notifications",
    "/qd-trips": "Quick Date Trips List",
    "/qd-location": "QD Trips Location List",
    "/assign-notice": "Notice Logs",

    // meta data section
    "/coach-category_metadata": "Consultant Categories",
    "/language-metadata": "Meta Language",
    "/promotional-card-metadata": "Promotional Card",
    "/dashboard-banner-metadata": "Dashboard Bannner list",
    "/coach-skills-metadata": "Coach Skills",
    "/report-reason": "Report Reason",
    "/consultant-service-rate": "Consultant Service Rate",
    "/menu-orders": "Menu item List",
    "/countries-list": "Country List",
    "/consultant-notice": "Consultant Notice List",
    "/coach-rate": "Consultant Rate List",
    "/profile-progress": "Consultant Profile Progress",
    "/dashboard-order": "Dashboard Order List",
    "/app-version": "App Version",

    // cms data section.

    "/cms-data": "CMS-Data",
    "/cms-dashboard-banner": "CMS Dashboard Web Banner ",
    "/cms-social-icons": "CMS Social Icons",
    "/cms-categories-list": "CMS Category List",
    "/cms-author-list": "CMS Blog Author List",
    "/cms-blog-list": "CMS Blog List",
    "/cms-faq-list": "CMS FAQs List",
    "/cms-buzz-list": "CMS Buzz List",
    "/cms-page-manager": "CMS Page Manager List",
    "/cms-consultant-photo-guidelines": "CMS Photo Guidelines (Consultant)",
    "/cms-the-app-page": "CMS The App Page",
    "/cms-testimonial": "CMS Testimonial List",
    "/cms-listener-banner": "CMS Listener Banner",

    // Admin User
    "/admin-permission": "Permission Group",
    "/admin-permission/:id": "Permission List",
    "/role-permission/:id": "Assign Permissions",
    "/admin-user": "Admin Users",
    "/admin-roles": "Admin Roles",

    // master component
    "/order": "Order List",
    "/gift-history": "Gift History",
    "/gift": "Gifts List",
    "/user-subscription": "Users Subscription List",
    "/user-recharge": "Users Recharge List",
    "/user-recharge-summary": "Recharge Summary List",
    "/razorpay-recharge": "Razorpay Recharge List",
    "/user-notification": "User Notifications",
    "/notification-template": "User Notifications Template",
    "/send-notification": "Send Notifications To User",

    // master component payment section
    "/dating-products": "Dating Products",
    "/qd-products": "QD Products List",
    "/payment-transactions": "Payment Transaction",
    "/feature-list": "Features List",
    "/recharge-plans": "Recharge Plans",
    "/subscriptions-plans": "Subscription Plan",
    "/payout-request": "Payout Request",
    "/payout-History": "Payout History",
    "/payable-History": "Payable Log",
    "/coupon": "Coupon List",
    "/refund-list": "Refund List",
    "/blog-count": "Blog View Count",
    "/action-log": "Admin Action Log",
    "/onboarding-assign": "Onboarding Specialists",
    "/leads-list": "Marketing Lead List",
    "/marketing-assignee": "Marketing Onboarding Specialists",
    "/marketing-leads/onboarding/:id": "Marketing Leads Status",

    // prompt  , profile  options

    "/user-profile-option": "Profile Options",
    "/prompt-question": "prompt Question",
    "/user-passion": "Passion Options",
    "/user-desire": "User Desires",

    "/user-support-request": "User Support Request",
    "/support-question": "Support Question",
    "/consultant-support": "Consultant Support",

    "/consultant-user-notification": "Consultant Observing List",

    // chat message
    "/chat-message": "Chat Category List",

    "/no-order-consultants": "No Order Consultants",
    "/channel-monitor": "Channel Info",
  };

  //
  // const getTitleFromPath = (path) => {
  //   const pathParts = path.split("/");
  //   const basePath = `/${pathParts[1]}`;
  //   return pathTitleMap[basePath] || "Flute Admin Panel";
  // };

  const getTitleFromPath = (path) => {
    for (const pattern in pathTitleMap) {
      // Convert pattern to regex: '/admin-permission/:id' -> /^\/admin-permission\/[^/]+$/
      const regexPattern = new RegExp(
        "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$",
      );
      if (regexPattern.test(path)) {
        return pathTitleMap[pattern];
      }
    }

    // fallback to default
    return "Flute Admin Panel";
  };

  const pageTitle = getTitleFromPath(location.pathname);

  useEffect(() => {
    if (fetchData) {
      setCount(fetchData?.data?.unread_count);
    } else {
      setCount(0);
    }
  }, [fetchData]);

  const handleAvatarClick = (event) => {
    setLogoutPopupOpen(!logoutPopupOpen);
  };

  const handleClosePopup = () => {
    setLogoutPopupOpen(false);
  };

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  return (
    <>
      <AppBar>
        <Toolbar className="radhe navbar-header">
          <button
            className="nav-icon-btn mobile-menu-btn"
            onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
          >
            <Menu size={22} />
          </button>

          <Typography
            variant="h6"
            component={"div"}
            sx={{ flexGrow: 1 }}
            style={{ fontSize: "30px" }}
          >
            {pageTitle}
            {/* Flute Admin Panel  */}
            {/* {currentTitle} */}
          </Typography>

          <Stack direction={"row"} spacing={1} alignItems="center">
            {permissions?.["Dashboard"]?.includes("view_recharge") && (
              <span className="nav-revenue">₹ {revenueData?.total}</span>
            )}

            <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
              <button className="nav-icon-btn" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
            </Tooltip>

            {permissions?.["channel-info"]?.includes("view_channel_info") && (
              <Tooltip title="Channel Monitor">
                <Link to="/channel-monitor" className="nav-icon-btn">
                  <Radio size={22} />
                </Link>
              </Tooltip>
            )}

            {permissions?.["orders"]?.includes("order_notifications") && (
              <Tooltip title="Observing List">
                <Link to="/consultant-user-notification" className="nav-icon-btn">
                  <Eye size={22} />
                </Link>
              </Tooltip>
            )}

            <Tooltip title="Notifications">
              <Link to="notification" className="nav-icon-btn nav-bell-btn">
                <Bell size={22} />
                {count > 0 && <span className="nav-badge">{count}</span>}
              </Link>
            </Tooltip>

            <div className="nav-avatar" onClick={handleAvatarClick}>
              <img src="/girl-avtar.png" alt="avatar" />
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      {openNotification && (
        <NotificationBell
          isOpen={openNotification}
          onClose={handleOpenNotification}
        />
      )}

      {logoutPopupOpen && <LogoutPopup onClose={handleClosePopup} />}
    </>
  );
};

export default Navbar;
