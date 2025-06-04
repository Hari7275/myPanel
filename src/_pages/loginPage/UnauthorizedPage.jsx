import React from "react";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../_store/slices/authSlice";

const UnauthorizedPage = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <>
      <div style={{ color: "black" }}>
        {" "}
        "You do not have permission to access this page. Please contact the
        admin or try logging in with a different account."
      </div>

      <Button onClick={handleLogoutClick}>Login with Different Account</Button>
    </>
  );
};

export default UnauthorizedPage;
