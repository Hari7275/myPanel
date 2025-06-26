import React, { useEffect, useState } from "react";
import AstrologerDetailsComponent from './AstrologerDetailsComponent'
import AstrologerRightComponent from "./AstrologerRightComponent";
import AstrologerLinkComponent from "./AstrologerLinkComponent";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";

const AstrologerProfile = () => {
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
    navigate("/astrologer");
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
