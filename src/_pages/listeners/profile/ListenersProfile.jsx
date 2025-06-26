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
            <ListenerLeftComponent />
          </div>
        </div>

        <div className="main-link-container">
          <ListenerLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
          <div className="profile-rightPart">
            <ListenerRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListenersProfile;
