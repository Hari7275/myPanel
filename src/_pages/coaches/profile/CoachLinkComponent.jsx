import React from "react";

const CoachLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="vertical-nav">
        <div
          className={`nav-link ${
            activeComponent === "Overview" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Overview")}
        >
          <span>Overview</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "UpdateInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("UpdateInfo")}
        >
          <span>Update Info</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "Profile-Progress" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Profile-Progress")}
        >
          <span>Onboarding Progress</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "Gallery" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Gallery")}
        >
          <span>Gallery</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "CoachOrder" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachOrder")}
        >
          <span>Orders</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "CoachGifts" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachGifts")}
        >
          <span>Gifts</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "session-slot" ? "active" : ""
          }`}
          onClick={() => onComponentChange("session-slot")}
        >
          <span>Appointment Session</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "LiveStream" ? "active" : ""
          }`}
          onClick={() => onComponentChange("LiveStream")}
        >
          <span>Live Stream</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "CoachFollowers" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachFollowers")}
        >
          <span>Followers</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "CoachReviews" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachReviews")}
        >
          <span>Reviews</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "CoacheAccount" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoacheAccount")}
        >
          <span>Bank Details</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "Price-chart" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Price-chart")}
        >
          <span>Price Chart</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "Wallet" ? "active" : ""}`}
          onClick={() => onComponentChange("Wallet")}
        >
          <span>Wallet</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "consultant-commission" ? "active" : ""
          }`}
          onClick={() => onComponentChange("consultant-commission")}
        >
          <span>Flute Commission</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "CoachStatus" ? "active" : ""
          }`}
          onClick={() => onComponentChange("CoachStatus")}
        >
          <span>Service Status</span>
        </div>
      </header>
    </>
  );
};

export default CoachLinkComponent;
