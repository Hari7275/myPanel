import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import UserRightComponent from "./UserRightComponent";
import UserLinkComponent from "./UserLinkComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UsersProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClose = () => {
    // navigate(-1);
    navigate("/user", {
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10,
      },
    });
  };

  const [activeComponent, setActiveComponent] = useState("UserOverview");
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-section">
        {/* <div className="crossIconContainer">
          <div
            className="crossIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>
        </div> */}
        <div className="profile-top-container">
          <div className="">
            <UserDetailsComponent />
          </div>
        </div>

        <div className="main-link-container">
          <UserLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />

          <div className="profile-rightPart">
            <UserRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersProfile;
