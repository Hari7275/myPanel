import React from "react";

const CoachLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="vertical-nav">
        <div
          className={`nav-link ${activeComponent === "Overview" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Overview")}
        >
          <span>overview</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "CoachStatus" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoachStatus")}
        >
          <span>Coach Status</span>
        </div>

        <div
          className={`nav-link ${activeComponent === "UpdateInfo" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UpdateInfo")}
        >
          <span>Update Info</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "Gallery" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Gallery")}
        >
          <span>Gallery</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "CoacheAccount" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoacheAccount")}
        >
          <span>Accounts</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "Wallet" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Wallet")}
        >
          <span>Wallet</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "CoachOrder" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoachOrder")}
        >
          <span>orders</span>
        </div>

        <div
          className={`nav-link ${activeComponent === "CoachFollowers" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoachFollowers")}
        >
          <span>Followers</span>
        </div>

        <div
          className={`nav-link ${activeComponent === "CoachReviews" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoachReviews")}
        >
          <span>review & notifications</span>
        </div>

        <div
          className={`nav-link ${activeComponent === "CoachGifts" ? "active" : ""
            }`}
          onClick={() => onComponentChange("CoachGifts")}
        >
          <span>Gifts</span>
        </div>

        {/* <div
          className={`nav-link ${
            activeComponent === "CoachSetting" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachSetting")}
        >
          <span>settings</span>
        </div> */}

        <div
          className={`nav-link ${activeComponent === "LiveStream" ? "active" : ""
            }`}
          onClick={() => onComponentChange("LiveStream")}
        >
          <span>Live Stream</span>
        </div>

        <div
          className={`nav-link ${activeComponent === "Profile-Progress" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Profile-Progress")}
        >
          <span>Profile Progress</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "session-slot" ? "active" : ""
            }`}
          onClick={() => onComponentChange("session-slot")}
        >
          <span>Session Appointment</span>
        </div>

        <div
          className={`profile-link ${
            activeComponent === "consultant-commission" ? "active" : ""
          }`}
          onClick={() => onComponentChange("consultant-commission")}
        >
          <span>commission</span>
        </div>
      </header>
    </>
  );
};

export default CoachLinkComponent;
