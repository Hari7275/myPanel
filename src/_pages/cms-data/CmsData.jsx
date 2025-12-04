import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../_store/slices/pageTitleSlice";

import CmsDataList from "./CmsDataList";

const CmsData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Categories"));
  }, []);
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          {/* <div className="profileheader">Categories</div> */}
          {/* <div className="divider"></div> */}
        </div>

        <CmsDataList />
      </div>
    </>
  );
};

export default CmsData;
