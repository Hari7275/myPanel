import React from "react";
import ConsultantGetDetails from "./ConsultantGetDetails";
import AdminUpdateDeatils from "./AdminUpdateDeatils";
import { useParams } from "react-router-dom";

const ProfileReview = () => {
  const { consultantId } = useParams();

  return (
    <>
      <div style={{ padding: "20px" }}>Profile Review</div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 60px)",
        }}
      >
        <div
          style={{
            width: "35%",
            height: "700px",
            overflowY: "auto",
            boxSizing: "border-box",
            borderRight: "1px solid #ccc",
          }}
        >
          <ConsultantGetDetails consultantId={consultantId} />
        </div>
        <div
          style={{
            width: "65%",
            height: "600px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <AdminUpdateDeatils consultantId={consultantId} />
        </div>
      </div>
    </>
  );
};

export default ProfileReview;
