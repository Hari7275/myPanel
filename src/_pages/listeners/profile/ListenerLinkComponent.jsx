import React from "react";

const ListenerLinkComponent = ({ onComponentChange, activeComponent }) => {
  return (
    <>
      <header className="vertical-nav">
        <div
          className={`nav-link ${
            activeComponent === "ListenerOverview" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerOverview")}
        >
          <span>Overview</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "ListenerInfo" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerInfo")}
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
            activeComponent === "ListenerOrder" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerOrder")}
        >
          <span>Orders</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "ListenerFollowers" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerFollowers")}
        >
          <span>Favourite</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "ListenerReviewsListingTable" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerReviewsListingTable")}
        >
          <span>Reviews</span>
        </div>

        <div
          className={`nav-link ${
            activeComponent === "ListenerAccount" ? "active" : ""
          }`}
          onClick={() => onComponentChange("ListenerAccount")}
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

        {/* <div
          className={`nav-link ${
            activeComponent === "session-slot" ? "active" : ""
          }`}
          onClick={() => onComponentChange("session-slot")}
        >
          <span>Session Appointment</span>
        </div> */}

        {/* <div
          className={`nav-link ${
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
