import React from "react";
import Settings from "../../../_components/reuseComponents/Settings";

const ListenerSetting = () => {
  return (
    <div>
      <div className="profile-sub-container  sub-container">
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
          Listener Settings
        </h2>

        <Settings />
      </div>
    </div>
  );
};

export default ListenerSetting;
