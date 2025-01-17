import React, { useState } from 'react'
import UserMatches from "./userMatches/UserMatches";
import UserLikesDislikes from './likesDislikes/UserLikesDislikes';
import DiscoverySettings from './discoverySettings/DiscoverySettings';
import UserCompliments from './compliments/UserCompliments';

const Discovery = () => {
    const [activeComponent, setActiveComponent] = useState("DiscoverySettings");

    const handleComponentChange =(component)=>{
        setActiveComponent(component)
    }
  return (
    <>
      <div className="profile-sub-container ProfileData-container sub-container">
        <header
          className="profile-mainContainer "
          style={{ margin: "-20px 0px 20px -35px" }}
        >
          <div
            className={`profile-link ${
              activeComponent === "UserMatches" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("UserMatches")}
          >
            <span>User Match</span>
          </div>
          <div
            className={`profile-link ${
              activeComponent === "UserLikesDislikes" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("UserLikesDislikes")}
          >
            <span>User swiping</span>
          </div>

          <div
            className={`profile-link ${
              activeComponent === "DiscoverySettings" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("DiscoverySettings")}
          >
            <span>Discovery Settings</span>
          </div>

          <div
            className={`profile-link ${
              activeComponent === "UserCompliments" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("UserCompliments")}
          >
            <span>User Compliments</span>
          </div>
        </header>

        <div>
          {activeComponent === "UserMatches" && <UserMatches />}
          {activeComponent === "UserLikesDislikes" && <UserLikesDislikes />}
          {activeComponent === "DiscoverySettings" && <DiscoverySettings />}
          {activeComponent === "UserCompliments" && <UserCompliments />}
        </div>
      </div>
    </>
  );
}

export default Discovery;