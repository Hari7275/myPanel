import React, { useState, useEffect } from "react";
import CoachLeftComponent from "./CoachLeftComponent";
import CoachRightComponent from "./CoachRightComponent";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CoachLinkComponent from "./CoachLinkComponent";
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";

const CoachProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleProfileClose = () => {
    navigate("/coaches");
    // navigate(-1);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);

    dispatch(resetActiveTab());
  };

  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          <div className="profileheader">Coach Profile</div>

          <div
            className="profileheader secondIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>

          <div className="divider"></div>
        </div>

        <div className="sub-container" style={{ paddingBottom: "10px" }}>
          <CoachLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
        </div>

        <div className="main-card-container">
          <div className="leftPart">
            <CoachLeftComponent />
          </div>
          <div className="rightPart">
            <CoachRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
