import React from "react";

const AstrologerLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="profile-mainContainer">
        <div
          className={`profile-link ${
            activeComponent === "Overview" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Overview")}
        >
          <span>overview</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "AstrologerInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerInfo")}
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
            activeComponent === "account" ? "active" : ""
          }`}
          onClick={() => onComponentChange("account")}
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
            activeComponent === "AstrologerOrder" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerOrder")}
        >
          <span>orders</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "AstrologerFollowers" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerFollowers")}
        >
          <span>Followers</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "AstroReviewsListingTable" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstroReviewsListingTable")}
        >
          <span>review & notifications</span>
        </div>
        <div
          className={`profile-link ${
            activeComponent === "AstrologerGifts" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerGifts")}
        >
          <span>Gifts</span>
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
            activeComponent === "AstrologerSetting" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerSetting")}
        >
          <span>Settings</span>
        </div> */}
      </header>
    </>
  );
};

export default AstrologerLinkComponent;
