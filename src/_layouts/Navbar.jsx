import React, { useState, useEffect } from "react";
import LogoutPopup from "../_pages/loginPage/LogoutPopup";
import NotificationBell from "./NotificationBell";
import { useGetNotificationUnreadCountQuery } from "../_store/api";

import { AppBar, IconButton, Toolbar, Typography, Stack } from "@mui/material";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [count, setCount] = useState(2);
  const { data: fetchData } = useGetNotificationUnreadCountQuery();

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
            Flute Admin Panel
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
                <img src="bell.png" />
              </Link>
            </div>

            {count}

            <div className="navbar-img" onClick={handleAvatarClick}>
              <img src="girl-avtar.png" />
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
