import React, { useState, useEffect } from "react";
import LogoutPopup from "../_pages/loginPage/LogoutPopup";
import NotificationBell from "./NotificationBell";
import { useGetNotificationUnreadCountQuery } from "../_store/api";

import { AppBar, IconButton, Toolbar, Typography, Stack } from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [count, setCount] = useState(2);
  const { data: fetchData } = useGetNotificationUnreadCountQuery();
  const currentTitle = useSelector(
    (state) => state.pageTitle?.title || "Flute Admin Panel"
  );

  const location = useLocation();

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
    // Admin User
    "/admin-permission": "Permission Group",
    "/admin-permission/:id": "Permission List",
    "/role-permission/:id": "Assign Permissions",
    "/admin-user": "Admin Users",
    "/admin-roles": "Admin Roles",

    // master component
    "/order": "Order List",
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
    "/payment-transactions": "Payment Transaction",
    "/feature-list": "Features List",
    "/recharge-plans": "Recharge Plans",
    "/subscriptions-plans": "Subscription Plan",
    "/payout-request": "Payout Request",
    "/payout-History": "Payout History",
    "/payable-History": "Payable Log",
    "/coupon": "Coupon List",
    "/blog-count": "Blog View Count",
    "/action-log": "Admin Action Log",
    "/onboarding-assign": "Onboarding Specialists",
    "/leads-list": "Marketing Lead List",

    // prompt  , profile  options

    "/user-profile-option": "Profile Options",
    "/prompt-question": "prompt Question",
    "/user-passion": "Passion Options",
    "/user-desire": "User Desires",

    "/user-support-request": "User Support Request",
    "/support-question": "Support Question",
    "/consultant-support": "Consultant Support",
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
        "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$"
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          ></IconButton>
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
          <Stack direction={"row"} spacing={2}>
            <div
              className="navbar-img"
              style={{
                marginTop: "2px",
                padding: "6px",
                background: "#d1e72357",
              }}
            >
              <Link to="notification">
                {" "}
                <img src="/bell.png" />
              </Link>
            </div>

            {count}

            <div className="navbar-img" onClick={handleAvatarClick}>
              <img src="/girl-avtar.png" />
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
