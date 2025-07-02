import React, { useEffect, useState } from "react";
import AstrologerDetailsComponent from './AstrologerDetailsComponent'
import AstrologerRightComponent from "./AstrologerRightComponent";
import AstrologerLinkComponent from "./AstrologerLinkComponent";
 
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { useLocation } from "react-router-dom";

const AstrologerProfile = () => {
 
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

   

  const handleComponentChange = (component) => {
    setActiveComponent(component);

    dispatch(resetActiveTab());
  };

  return (
    <>
      <div className="profile-section">
         

        <div className="profile-top-container">
          <div className="">
            <AstrologerDetailsComponent />
          </div>
        </div>

        <div className="main-link-container">
          <AstrologerLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
          <div className="profile-rightPart">
            <AstrologerRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrologerProfile;
