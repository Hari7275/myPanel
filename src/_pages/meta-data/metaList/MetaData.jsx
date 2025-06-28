import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../_store/slices/pageTitleSlice";

import MetaDataList from "./MetaDataList";

const MetaData = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle("Categories"));
  },[])
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          {/* <div className="profileheader">Categories</div> */}
          {/* <div className="divider"></div> */}
        </div>

        <MetaDataList />
      </div>
    </>
  );
};

export default MetaData;
