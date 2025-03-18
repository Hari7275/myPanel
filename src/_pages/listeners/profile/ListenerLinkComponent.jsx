import React from "react";

const ListenerLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="profile-mainContainer">
        <div
          className={`profile-link ${
            activeComponent === "ListenerOverview" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerOverview")}
        >
          <span>overview</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "ListenerInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerInfo")}
        >
          <span>Update Info</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "Gallery" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Gallery")}
        >
          <span>Gallery</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "ListenerAccount" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerAccount")}
        >
          <span>Accounts</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "Wallet" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Wallet")}
        >
          <span>Wallet</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "ListenerOrder" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerOrder")}
        >
          <span>orders</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "ListenerFollowers" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerFollowers")}
        >
          <span>Followers</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "ListenerReviewsListingTable" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerReviewsListingTable")}
        >
          <span>review & notifications</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "Profile-Progress" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Profile-Progress")}
        >
          <span>Profile Progress</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "session-slot" ? "active" : ""
          }`}
          onClick={() => onComponentChange("session-slot")}
        >
          <span>Session Appointment</span>
        </div>
        

        {/* <div
          className={`profile-link ${
            activeComponent === "ListenerSetting" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerSetting")}
        >
          <span>Settings</span>
        </div> */}
      </header>
    </>
  );
};

export default ListenerLinkComponent;
