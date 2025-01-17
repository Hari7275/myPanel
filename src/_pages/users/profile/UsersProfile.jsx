import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserLeftComponent from "./UserLeftComponent";
import UserRightComponent from "./UserRightComponent";
import UserLinkComponent from "./UserLinkComponent";

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
        <div className="profileMainComponent">
          <div className="profileheader">User Profile</div>

          <div
            className="profileheader secondIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>

          <div className="divider"></div>
        </div>
        <div className="sub-container" style={{ paddingBottom: "10px" }}>
          <UserLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
        </div>

        <div className="main-card-container">
          <div className="leftPart">
            <UserLeftComponent />
          </div>
          <div className="rightPart">
            <UserRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersProfile;
