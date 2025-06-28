import React, { useEffect, useState } from "react";
import AstrologerDetailsComponent from './AstrologerDetailsComponent'
import AstrologerRightComponent from "./AstrologerRightComponent";
import AstrologerLinkComponent from "./AstrologerLinkComponent";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { useLocation } from "react-router-dom";

const AstrologerProfile = () => {
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
    // navigate(-1);
    navigate("/astrologer",{
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10
      }
    });
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
