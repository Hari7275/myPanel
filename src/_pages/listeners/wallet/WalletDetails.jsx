// export default WalletDetails;

import React, { useState, useEffect } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";

// import { CategoryCard } from "../../dashboard/DashboardSubPage";

import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../../../_context/ThemeContext";

export const CategoryCardWallet = ({ symbol, label, price, bgcolor }) => (
  <div>
    <div
      className="card dashboard-card"
      style={{ backgroundColor: bgcolor, boxShadow: "none", margin: "20px", color: "var(--text-primary)" }}
    >
      <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
      <span style={{ fontSize: "24px", fontWeight: "700" }}>
        {symbol} {price}
      </span>
    </div>
  </div>
);

const WalletDetails = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");
  const currencyCateg = params.get("currency_category");

  // const currencySymbol = consultantCateg == 91 ? "₹" : "$";
  const currencySymbol = currencyCateg == "A" ? "₹" : "$";

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  // Color mapping based on label
  const getCardColor = (label) => {
    const lightColorMap = {
      "This Month Earning": "#E3F2FD",
      "This Week Earning": "#F3E5F5",
      "Today Earning": "#E8F5E9",
      "Total Payout": "#FFF3E0",
      "Life Time Earning": "#E0F2F1",
      "Current Wallet Balance": "#D9F7E7",
      "Payable Amount": "#FCE4EC",
    };
    const darkColorMap = {
      "This Month Earning": "#1a2a3a",
      "This Week Earning": "#2a1a3a",
      "Today Earning": "#1a2e1a",
      "Total Payout": "#2e2010",
      "Life Time Earning": "#0f2a28",
      "Current Wallet Balance": "#0f2820",
      "Payable Amount": "#2e0f1a",
    };
    const colorMap = isDarkMode ? darkColorMap : lightColorMap;
    return colorMap[label] || (isDarkMode ? "#1a1a2e" : "#F5F5F5");
  };

  const cardData = [
    {
      label: "Today Earning",
      value: data?.walletDetails?.today_earning || "0",
    },
    // {
    //   label: "This Week Earning",
    //   value: data?.walletDetails?.last_week_earning || "0",
    // },
    {
      label: "This Month Earning",
      value: data?.walletDetails?.last_month_earning || "0",
    },
    {
      label: "Life Time Earning",
      value: data?.walletDetails?.lifetime_earning || 0,
    },
    {
      label: "Total Payout",
      value: data?.walletDetails?.total_debit || "0",
    },
    {
      label: "Payable Amount",
      value: data?.walletDetails?.payable_amount || 0,
    },
    {
      label: "Current Wallet Balance",
      value: data?.walletDetails?.wallet_balance || 0,
    },
  ];

  return (
    <>
      <div className="useroverview" style={{ paddingLeft: "25px" }}>
        <div
          className="dashboard-card-container-grid"
          style={{ margin: "10px 0", height: "60vh", overflow: "scroll" }}
        >
          {cardData.map((card, index) => (
            <CategoryCardWallet
              key={`${card.label}-${index}`}
              label={card.label}
              price={card.value}
              symbol={currencySymbol}
              bgcolor={getCardColor(card.label)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default WalletDetails;
