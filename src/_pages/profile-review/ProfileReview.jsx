import React from "react";
import ConsultantGetDetails from "./ConsultantGetDetails";

const ProfileReview = () => {
  return (
    <>
      <div>ProfileReview</div>

      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <ConsultantGetDetails />
        </div>
        <div style={{ flex: 1 }}>
          <ConsultantGetDetails />
        </div>
      </div>
    </>
  );
};

export default ProfileReview;
