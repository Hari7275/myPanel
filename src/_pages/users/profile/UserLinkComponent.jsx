import React from "react";

const UserLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <div className="vertical-nav">
        <div
          className={`nav-link ${activeComponent === "UserOverview" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserOverview")}
        >
          <span>Overview</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserInfo" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserInfo")}
        >
          <span>User Info</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserData" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserData")}
        >
          <span>User Data</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserSubscription" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserSubscription")}
        >
          <span>Subscription</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserGalllery" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserGalllery")}
        >
          <span>Gallery</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserTransactionList" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserTransactionList")}
        >
          <span>Transaction List</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserRegulation" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserRegulation")}
        >
          <span>User Regulation</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "QuickDate" ? "active" : ""
            }`}
          onClick={() => onComponentChange("QuickDate")}
        >
          <span>Quick Date</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "Discovery" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Discovery")}
        >
          <span>Discovery</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserDatingStatus" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserDatingStatus")}
        >
          <span>User Type & Dating Status</span>
        </div>
      </div>
    </>
  );
};

export default UserLinkComponent;
