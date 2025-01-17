import React from "react";

import MetaDataList from "./MetaDataList";

const MetaData = () => {
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          <div className="profileheader">Categories</div>

          <div className="divider"></div>
        </div>

        <MetaDataList />
      </div>
    </>
  );
};

export default MetaData;
