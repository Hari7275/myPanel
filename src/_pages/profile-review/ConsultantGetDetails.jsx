import React from "react";
import { useGetProfileReviewDetailsQuery } from "../../_store/api";

const ConsultantGetDetails = ({ consultantId }) => {
  const { data: fetchData } = useGetProfileReviewDetailsQuery({
    id: consultantId,
  });

  const consultantData = fetchData?.data?.consultant_submitted_data || {};
  console.log("consultantData", consultantData);
  return (
    <div className="main-container sub-container">
      <div className="RewardsTxn-container">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
          >
            <h3 className="main-heading" style={{ marginBottom: "0px" }}>
              Consultant Details: {consultantId}
            </h3>
          </div>

          <div className="info-pair">
            <p className="info-item">
              <strong>description : </strong>
              {consultantData?.description}
            </p>
          </div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Service : </strong>
              {consultantData?.services}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantGetDetails;
