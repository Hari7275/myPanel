import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useGetSingleSubscriptionDetailsQuery } from "../../../_store/api";

import { useSelector } from "react-redux";

const InfoItem = ({ label, value }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const SubscriptionDetails = ({ isOpen, onClose, selectedRow }) => {
  const [data, setData] = useState(null);

  const { data: fetchData } = useGetSingleSubscriptionDetailsQuery({
    id: selectedRow,
  });

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  console.log("data....", data);
  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div style={{ width: "350px", height: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
          }}
        >
          Subscription details
        </h2>

        <InfoItem label="Subscription Id" value={data?.id || "N/A"} />
        <div className="line"></div>
        <InfoItem label="Display Name" value={data?.display_name || "N/A"} />
        <div className="line"></div>
        <InfoItem
          label="Price"
          value={`${data?.currency} ${data?.price || "N/A"}`}
        />
        <div className="line"></div>
        <InfoItem
          label="Validity Period"
          value={data?.validity_period || "N/A"}
        />
        <div className="line"></div>
        <InfoItem label="Description" value={data?.description || "N/A"} />
        <div className="line"></div>
        <InfoItem
          label="Device Type"
          value={data?.device_type == 1 ? "Andriod" : "IOS" || "N/A"}
        />
        <div className="line"></div>
      </div>
    </ReactModal>
  );
};

export default SubscriptionDetails;
