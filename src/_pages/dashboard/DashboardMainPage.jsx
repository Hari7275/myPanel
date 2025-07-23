import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../_store/slices/pageTitleSlice";
import DashboardSubPage from "./DashboardSubPage";

const DashboardMainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setPageTitle("Flute Admin Panel"));
    dispatch(setPageTitle("Dashboard"));
  }, [])
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          {/* <div className="profileheader " style={{ color: "#202224" }}>
            Dashboard
          </div>
          <div className="divider"></div> */}
        </div>
        <DashboardSubPage />
      </div>
    </>
  );
};

export default DashboardMainPage;
