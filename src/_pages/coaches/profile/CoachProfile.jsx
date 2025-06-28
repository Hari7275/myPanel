import React, { useState, useEffect } from "react";
import CoachLeftComponent from "./CoachLeftComponent";
import CoachRightComponent from "./CoachRightComponent";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CoachLinkComponent from "./CoachLinkComponent";
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { useLocation } from "react-router-dom";

const CoachProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
console.log("location...................",location.state)
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
    navigate("/coaches",{
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10
      }
    });
    // navigate(-1);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);

    dispatch(resetActiveTab());
  };

  return (
    <>
      <div className="profile-section">
        <div className="crossIconContainer">
          <div
            className="crossIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>
        </div>

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
