import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserRightComponent from "./UserRightComponent";
import UserLinkComponent from "./UserLinkComponent";
import UserDetailsComponent from "./UserDetailsComponent";

const UsersProfile = () => {
  const navigate = useNavigate();

  const handleProfileClose = () => {
    navigate(-1);
  };

  const [activeComponent, setActiveComponent] = useState("UserOverview");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-section">
        <div className="crossIconContainer">
          <div
            className="crossIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>
        </div>
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
