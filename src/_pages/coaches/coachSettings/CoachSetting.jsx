import React from "react";
import Settings from "../../../_components/reuseComponents/Settings";

const CoachSetting = () => {
  return (
    <div>
      <div className="profile-sub-container  profile-right-sub-container">
        <h2
          className="main-heading "
          style={{
            marginBottom: "0px",
            display: "flex",
            justifyContent: "center",
            lineHeight: "1.2",
            fontSize: "26px",
          }}
        >
          Coach Settings
        </h2>

        <Settings />
      </div>
    </div>
  );
};

export default CoachSetting;
