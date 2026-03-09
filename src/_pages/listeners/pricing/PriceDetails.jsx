// export default WalletDetails;

import React, { useState, useEffect } from "react";
// import { useGetConsultantsPriceQuery } from "../../../_store/api";
import { useGetConsultantsNewPriceQuery } from "../../../_store/api";
import { getFetaureLabel } from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../../../_context/ThemeContext";

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
  CategoryDetails,
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
        color: "var(--text-primary)",
      }}
    >
      <span
        style={{
          fontSize: "20px",
          fontWeight: "600",
          margin: "0 auto 20px",
        }}
      >
        {label}({CategoryDetails})
      </span>

      <div className="info-pair">
        <p className="info-item">
          <strong>Current Price : </strong>

          <span>
            {currency == "INR" ? "₹" : "$"} {currentPrice}
          </span>
        </p>
      </div>

      <div className="info-pair">
        <p className="info-item">
          <strong>Discount Price : </strong>
          <span>
            {currency == "INR" ? "₹" : "$"} {discountPrice}
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
  const { isDarkMode } = useTheme();
  const [priceData, setPriceData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const { data: fetchPrice, isError } =
    useGetConsultantsNewPriceQuery(consultantId);

  // useEffect(() => {
  //   if (fetchPrice && fetchPrice?.data) {
  //     setPriceData(
  //       fetchPrice?.data
  //       // ?.filter((item) => item?.status !== 7 && item?.status == 2)
  //       // .reverse() || []
  //     );
  //   } else setPriceData([]);
  // }, [fetchPrice]);

  useEffect(() => {
    if (fetchPrice && fetchPrice?.data) {
      const sortedData = [...fetchPrice.data].sort((a, b) =>
        a.user_category.localeCompare(b.user_category)
      );

      setPriceData(sortedData);
    } else {
      setPriceData([]);
    }
  }, [fetchPrice]);

  console.log("priceData", priceData);
  // Color mapping based on label
  const getCardColor = (label) => {
    const lightColorMap = {
      "Audio Call": "#E3F2FD",
      "Video Call": "#F3E5F5",
      Chat: "#E8F5E9",
      USD: "#FFF3E0",
      INR: "#D9F7E7",
      "Payable Amount": "#FCE4EC",
    };
    const darkColorMap = {
      "Audio Call": "#1a2a3a",
      "Video Call": "#2a1a3a",
      Chat: "#1a2e1a",
      USD: "#2e2010",
      INR: "#0f2820",
      "Payable Amount": "#2e0f1a",
    };
    const colorMap = isDarkMode ? darkColorMap : lightColorMap;
    return colorMap[label] || (isDarkMode ? "#1a1a2e" : "#F5F5F5");
  };

  return (
    <>
      <div className="useroverview" style={{ paddingLeft: "25px" }}>
        <div
          className="dashboard-card-container-grid"
          style={{
            margin: "10px 0",
            height: "60vh",
            overflow: "scroll",
            alignContent: "start",
          }}
        >
          {/* {priceData?.map((card, index) => (
            <CategoryPriceCard
              key={`${card.label}-${index}`}
              label={getFetaureLabel(card.feature)}
              currentPrice={card.current_price}
              discountPrice={card.discount_price}
              commission={card.commission}
              currency={card.currency}
              //   bgcolor={getCardColor(getFetaureLabel(card.feature))}
              bgcolor={getCardColor(card.currency)}
            />
          ))} */}

          {priceData?.map((card, index) => (
            <CategoryPriceCard
              key={`${card.label}-${index}`}
              CategoryDetails={card.user_category}
              label={getFetaureLabel(card.service_type)}
              currentPrice={card.price_per_minute}
              discountPrice={card.discount_price}
              commission={card.flute_commission}
              currency={card.user_currency}
              //   bgcolor={getCardColor(getFetaureLabel(card.feature))}
              bgcolor={getCardColor(card.user_currency)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
