import React, { useState } from "react";
import ListenerLeftComponent from "./ListenerLeftComponent";
import ListenerRightComponent from "./ListenerRightComponent";
import ListenerLinkComponent from "./ListenerLinkComponent";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListenersProfile = () => {
  const navigate = useNavigate();
  const handleProfileClose = () => {
    navigate("/listeners");
    
    // navigate(-1);
  };

  const [activeComponent, setActiveComponent] = useState("ListenerOverview");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          <div className="profileheader">Listeners Profile</div>

          <div
            className="profileheader secondIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>

          <div className="divider"></div>
        </div>

        <div className="sub-container" style={{ paddingBottom: "10px" }}>
          <ListenerLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
        </div>

        <div className="main-card-container">
          <div className="leftPart">
            <ListenerLeftComponent />
          </div>
          <div className="rightPart">
            <ListenerRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListenersProfile;
