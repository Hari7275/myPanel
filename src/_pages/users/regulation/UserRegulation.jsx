import React, { useState } from "react";
import AvoidedUser from "./avoideduser/AvoidedUser";
import UserBlacklisting from "./blacklisting/UserBlacklisting";
import ReportedUser from "./reporteduser/ReportedUser";
import HiddenUserListing from "./hiddenuser/HiddenUserListing";

const UserRegulation = () => {
  const [activeComponent, setActiveComponent] = useState("UserBlacklisting");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-sub-container ProfileData-container profile-right-sub-container">
        <header
          className="profile-mainContainer "
          style={{ margin: "-20px 0px 20px -35px" }}
        >
          <div
            className={`profile-link ${activeComponent === "AvoidedUser" ? "subactive" : ""
              }`}
            onClick={() => handleComponentChange("AvoidedUser")}
          >
            <span>Avoided User</span>
          </div>
          <div
            className={`profile-link ${activeComponent === "UserBlacklisting" ? "subactive" : ""
              }`}
            onClick={() => handleComponentChange("UserBlacklisting")}
          >
            <span>Blacklisted & reported User</span>
          </div>

          {/* <div
            className={`profile-link ${
              activeComponent === "ReportedUser" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("ReportedUser")}
          >
            <span>Reported User</span>
          </div> */}

          <div
            className={`profile-link ${activeComponent === "HiddenUserListing" ? "subactive" : ""
              }`}
            onClick={() => handleComponentChange("HiddenUserListing")}
          >
            <span>Hidden User</span>
          </div>
        </header>

        <div>
          {activeComponent === "AvoidedUser" && <AvoidedUser />}
          {activeComponent === "UserBlacklisting" && <UserBlacklisting />}
          {activeComponent === "ReportedUser" && <ReportedUser />}
          {activeComponent === "HiddenUserListing" && <HiddenUserListing />}
        </div>
      </div>
    </>
  );
};

export default UserRegulation;
