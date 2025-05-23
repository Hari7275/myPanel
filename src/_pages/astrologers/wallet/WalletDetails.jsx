import React, { useState, useEffect } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";

import { useSelector } from "react-redux";

const InfoItem = ({ label, value }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label} : </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const WalletDetails = () => {
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

  return (
    <>
      {/* <div className="line"></div>
      <div className="line"></div>
      <div className="divider"></div> */}

      <div className="userProfile-card">
        <footer className="userProfile-footer">
          <div className="userProfile-footer-content">
            <InfoItem
              label=" Last Month Earning"
              value={data?.walletDetails?.last_month_earning || "0"}
            />
            <div className="line"></div>

            <InfoItem
              label="Last Week Earning"
              value={data?.walletDetails?.last_week_earning || "0"}
            />
            <div className="line"></div>

            <InfoItem
              label="Today Earning"
              value={data?.walletDetails?.today_earning || "0"}
            />
            <div className="line"></div>

            <InfoItem
              label="Total Debit"
              value={data?.walletDetails?.total_debit || "0"}
            />
            <div className="line"></div>

            <InfoItem
              label="Life Time Earning"
              value={data?.walletDetails?.lifetime_earning || 0}
            />
            <div className="line"></div>

            <InfoItem
              label="Current Wallet Balance"
              value={data?.walletDetails?.wallet_balance || 0}
            />
            <div className="line"></div>

            <InfoItem
              label="Payable Amount"
              value={data?.walletDetails?.payable_amount}
            />
            <div className="line"></div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WalletDetails;
