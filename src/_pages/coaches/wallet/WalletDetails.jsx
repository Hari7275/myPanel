// import React, { useState, useEffect } from "react";
// import { useGetConsultantsDetailsQuery } from "../../../_store/api";

// import { useSelector } from "react-redux";

// const InfoItem = ({ label, value }) => (
//   <div className="card-footer-content">
//     <div className="info-pair">
//       <p className="info-item">
//         <strong>{label} : </strong>
//         <span>{value}</span>
//       </p>
//     </div>
//   </div>
// );

// const WalletDetails = () => {
//   const [data, setData] = useState([]);
//   const consultantId = useSelector((state) => state.consultant.consultantData);

//   const {
//     data: fetchData,
//     isLoading,
//     error,
//   } = useGetConsultantsDetailsQuery(consultantId);

//   useEffect(() => {
//     if (fetchData) {
//       setData(fetchData.data);
//     }
//   }, [fetchData]);

//   return (
//     <>
//       {/* <div className="line"></div>
//       <div className="line"></div>
//       <div className="divider"></div> */}

//         <div className="userProfile-card">
//           <footer className="userProfile-footer">
//             <div className="userProfile-footer-content">
//               <InfoItem
//                 label=" Last Month Earning"
//                 value={data?.walletDetails?.last_month_earning || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Last Week Earning"
//                 value={data?.walletDetails?.last_week_earning || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Today Earning"
//                 value={data?.walletDetails?.today_earning || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Total Debit"
//                 value={data?.walletDetails?.total_debit || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Life Time Earning"
//                 value={data?.walletDetails?.lifetime_earning || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Current Wallet Balance"
//                 value={data?.walletDetails?.wallet_balance || 0}
//               />
//               <div className="line"></div>

//               <InfoItem
//                 label="Payable Amount"
//                 value={data?.walletDetails?.payable_amount || 0}
//               />
//               <div className="line"></div>
//             </div>
//           </footer>
//         </div>

//     </>
//   );
// };

// export default WalletDetails;

import React, { useState, useEffect } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";

import { CategoryCard } from "../../dashboard/DashboardSubPage";

import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { CategoryCardWallet } from "../../listeners/wallet/WalletDetails";

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
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

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

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");
  const currencyCateg = params.get("currency_category");

  // const currencySymbol = consultantCateg == 91 ? "₹" : "$";
  const currencySymbol = currencyCateg == "A" ? "₹" : "$";

  // Color mapping based on label
  const getCardColor = (label) => {
    const colorMap = {
      "This Month Earning": "#E3F2FD", // Light Blue
      "This Week Earning": "#F3E5F5", // Light Purple
      "Today Earning": "#E8F5E9", // Light Green
      "Total Payout": "#FFF3E0", // Light Orange
      "Life Time Earning": "#E0F2F1", // Light Teal
      "Current Wallet Balance": "#D9F7E7", // Original Green
      "Payable Amount": "#FCE4EC", // Light Pink
    };

    return colorMap[label] || "#F5F5F5"; // Default light gray
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
          {cardData?.map((card, index) => (
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
