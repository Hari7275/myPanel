import React, { useState, useEffect } from "react";
import CoachLeftComponent from "./CoachLeftComponent";
import CoachRightComponent from "./CoachRightComponent";

import CoachLinkComponent from "./CoachLinkComponent";
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { useLocation } from "react-router-dom";

const CoachProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Redux state for active tab
  const profileActiveTab = useSelector((state) => state?.activeTab?.activeTab);

  // Local state for active component
  const [activeComponent, setActiveComponent] = useState("Overview");

  // Update activeComponent when profileActiveTab changes
  useEffect(() => {
    if (profileActiveTab) {
      setActiveComponent(profileActiveTab);
    } else {
      setActiveComponent("Overview");
    }
  }, [profileActiveTab]);

  const handleComponentChange = (component) => {
    setActiveComponent(component);

    dispatch(resetActiveTab());
  };

  return (
    <>
      <div className="profile-section">
        <div className="profile-top-container">
          <div className="">
            <CoachLeftComponent />
          </div>
        </div>

        <div className="main-link-container">
          <CoachLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
          <div className="profile-rightPart">
            <CoachRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
