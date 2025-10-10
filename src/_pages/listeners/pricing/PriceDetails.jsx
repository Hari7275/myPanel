// export default WalletDetails;

import React, { useState, useEffect } from "react";
import { useGetConsultantsPriceQuery } from "../../../_store/api";
import { getFetaureLabel } from "../../../_constants/consultantConstant";
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

export const CategoryPriceCard = ({
  label,
  price,
  bgcolor,
  discountPrice,
  currentPrice,
  commission,
  currency,
}) => (
  <div>
    <div
      className="card "
      style={{
        backgroundColor: bgcolor,
        boxShadow: "none",

        margin: "0px",
      }}
    >
      <span
        style={{
          fontSize: "20px",
          fontWeight: "600",
          margin: "0 auto 20px",
        }}
      >
        {label}
      </span>
      <div className="info-pair">
        <p className="info-item">
          <strong>Current Price : </strong>
          <span>
            {currency} {currentPrice}
          </span>
        </p>
      </div>
      <div className="info-pair">
        <p className="info-item">
          <strong>Discount Price : </strong>
          <span>
            {currency} {discountPrice}
          </span>
        </p>
      </div>
      <div className="info-pair">
        <p className="info-item">
          <strong>Commission : </strong>
          <span>{commission}</span>
        </p>
      </div>
    </div>
  </div>
);

const PriceDetails = () => {
  const [priceData, setPriceData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchPrice, isError } =
    useGetConsultantsPriceQuery(consultantId);

  useEffect(() => {
    if (fetchPrice && fetchPrice?.data) {
      setPriceData(
        fetchPrice?.data?.filter((item) => item?.status !== 7) || []
      );
    } else setPriceData([]);
  }, [fetchPrice]);

  // Color mapping based on label
  const getCardColor = (label) => {
    const colorMap = {
      "Audio Call": "#E3F2FD", // Light Blue
      "Video Call": "#F3E5F5", // Light Purple
      Chat: "#E8F5E9", // Light Green
      "Total Debit": "#FFF3E0", // Light Orange
      "Life Time Earning": "#E0F2F1", // Light Teal
      "Current Wallet Balance": "#D9F7E7", // Original Green
      "Payable Amount": "#FCE4EC", // Light Pink
    };

    return colorMap[label] || "#F5F5F5"; // Default light gray
  };

  return (
    <>
      <div className="useroverview" style={{ paddingLeft: "25px" }}>
        <div
          className="dashboard-card-container-grid"
          style={{ margin: "10px 0", height: "60vh", overflow: "scroll" }}
        >
          {priceData?.map((card, index) => (
            <CategoryPriceCard
              key={`${card.label}-${index}`}
              label={getFetaureLabel(card.feature)}
              currentPrice={card.current_price}
              discountPrice={card.discount_price}
              commission={card.commission}
              currency={card.currency}
              bgcolor={getCardColor(getFetaureLabel(card.feature))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
