import React, { useEffect, useState } from "react";
import AstrologerLeftComponent from "./AstrologerLeftComponent";
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
        <div className="profileMainComponent">
          <div className="profileheader">Astrologer Profile</div>

          <div
            className="profileheader secondIcon"
            onClick={handleProfileClose}
          >
            <X />
          </div>

          <div className="divider"></div>
        </div>

        <div className="sub-container" style={{ paddingBottom: "10px" }}>
          <AstrologerLinkComponent
            onComponentChange={handleComponentChange}
            activeComponent={activeComponent}
          />
        </div>

        <div className="main-card-container">
          <div className="leftPart">
            <AstrologerLeftComponent />
          </div>
          <div className="rightPart">
            <AstrologerRightComponent activeComponent={activeComponent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrologerProfile;
