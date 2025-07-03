import React from "react";

const AstrologerLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <div className="vertical-nav">
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
            activeComponent === "AstrologerInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerInfo")}
        >
          <span>Update Info</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "Profile-Progress" ? "active" : ""
          }`}
          onClick={() => onComponentChange("Profile-Progress")}
        >
          <span>Profile Progress</span>
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
            activeComponent === "AstrologerOrder" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerOrder")}
        >
          <span>Orders</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "AstrologerGifts" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerGifts")}
        >
          <span>Gifts</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "session-slot" ? "active" : ""
          }`}
          onClick={() => onComponentChange("session-slot")}
        >
          <span>Session Appointment</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "live-stream" ? "active" : ""
          }`}
          onClick={() => onComponentChange("live-stream")}
        >
          <span>Live Stream</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "AstrologerFollowers" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerFollowers")}
        >
          <span>Followers</span>
        </div>
        <div
          className={`nav-link ${
            activeComponent === "AstroReviewsListingTable" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstroReviewsListingTable")}
        >
          <span>Reviews</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "account" ? "active" : ""
          }`}
          onClick={() => onComponentChange("account")}
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
          className={`nav-link  ${
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
          <span>Astrologer Status</span>
        </div>
        {/* <div
          className={`nav-link ${
            activeComponent === "AstrologerSetting" ? "active" : ""
          }`}
          onClick={() => onComponentChange("AstrologerSetting")}
        >
          <span>Settings</span>
        </div> */}
      </div>
    </>
  );
};

export default AstrologerLinkComponent;
