import React from "react";

const UserLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="profile-mainContainer">
        <div
          className={`profile-link ${
            activeComponent === "UserOverview" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserOverview")}
        >
          <span>overview</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "UserInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserInfo")}
        >
          <span>User Info</span>
        </div>

        {/* manage the code from here */}

        <div
          className={`profile-link ${
            activeComponent === "UserData" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserData")}
        >
          <span>User Data</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "UserSubscription" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserSubscription")}
        >
          <span>Subscription</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "UserGalllery" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserGalllery")}
        >
          <span>Gallery</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "UserTransactionList" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserTransactionList")}
        >
          <span>Transaction List</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "UserRegulation" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserRegulation")}
        >
          <span>User Regulation</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "QuickDate" ? "active" : ""
          }`}
          onClick={() => onComponentChange("QuickDate")}
        >
          <span>quick date</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "Discovery" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Discovery")}
        >
          <span>Discovery</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "UserDatingStatus" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UserDatingStatus")}
        >
          <span>USer type & Dating status</span>
        </div>
      </header>
    </>
  );
};

export default UserLinkComponent;
