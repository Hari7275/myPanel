import React, { useState, useEffect } from "react";
import "../../cssfolder/LogoutPopup.css";
import { useNavigate } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import { Link } from "react-router-dom";
import { logout } from "../../_store/slices/authSlice";
import { useDispatch } from "react-redux";

const LogoutPopup = () => {
 
  const dispatch = useDispatch();

  // const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogoutClick = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <section className="main">
      <div className="logout-container">
        <Link to="/">
          <div className="logout-content" onClick={handleLogoutClick}>
            <span className="logout-firstSpan">
              <AcUnitIcon />
            </span>
            <span className="logout-secondSpan"> Logout</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LogoutPopup;
