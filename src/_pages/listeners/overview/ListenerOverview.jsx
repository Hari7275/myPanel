import React, { useEffect, useState } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { format } from "date-fns";

const InfoItem = ({ label, value, color }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong style={{ color: color }}>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const ListenerOverview = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // const dateFormat =(date)=>{
  //      return format(new Date(date), "MMMM dd, yyyy");
  // }

  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "N/A";
    }
    return format(new Date(date), "PPpp");
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <span> {error}</span>;
  }
  return (
    <div>
      <div className="userProfile-containr profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <div className="userProfile-footer-content">
              <InfoItem
                label="Mobile Number"
                value={`${data?.phone_code} ${data?.phoneNumber}`}
              />
              <InfoItem
                label="Language"
                value={(data?.languages || [])
                  .map((language) => capitalizeFirstLetter(language))
                  .join(", ")}
              />
              <div className="line"></div>

              <InfoItem label="Country" value={data?.country} />
              <div className="line"></div>

              <InfoItem label="Address" value={data?.address || "N/A"} />
              <div className="line"></div>

              <InfoItem
                label="Lifetime Earning"
                value={`INR ${data?.walletDetails?.lifetime_earning || 0}`}
                color="#4CAF50" // Green - represents available funds/positive balance
              />
              <div className="line"></div>

              <InfoItem
                label="Current Balance "
                value={`INR ${data?.walletDetails?.wallet_balance || 0}`}
                color="#2196F3"
              />
              <div className="line"></div>

              <InfoItem
                label="Payable Balance "
                value={`INR ${data?.walletDetails?.payable_amount || 0}`}
                color="#9C27B0"
              />
              <div className="line"></div>

              <InfoItem
                label="Applied Date "
                value={formatDate(data?.created_at)}
              />

              <div className="line"></div>

              <InfoItem
                label="Last Update"
                value={formatDate(data?.updated_at)}
              />

              {/* <InfoItem label="Last Active" value={`29/04/2024`} />
              <div className="line"></div> */}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ListenerOverview;
