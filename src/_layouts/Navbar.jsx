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
    "/users_Profile": "User Details",
    "/coaches": "Coach List",
    "/astrologer": "Astrologer List",
    "/listeners": "Listener List",
    "/dashboard": "Dashboard",
    "/meta-data": "Meta-Data",
    "/profile-review": "Consultant Review List",
    "/astrologer_Profile": "Astrologer Details",
    "/listener_Profile": "Listener Details",
    "/coach-profile": "Coach Details",
    "/notifications": "Notifications",
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
    // Admin User
    "/admin-permission": "Permission Group",
    "/admin-permission/:id": "Permission List",
    "/role-permission/:id": "Assign Permissions",
    "/admin-user": "Admin Users",
    "/admin-roles": "Admin Roles",

    // master component
    "/order": "Order List",
    "/gift": "Gifts List",
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
