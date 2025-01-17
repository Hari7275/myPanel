import React from "react";
import DashboardSubPage from "./DashboardSubPage";

const DashboardMainPage = () => {
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          <div className="profileheader " style={{ color: "#202224" }}>
            Dashboard
          </div>

          <div className="divider"></div>
        </div>
        <DashboardSubPage />
      </div>
    </>
  );
};

export default DashboardMainPage;
