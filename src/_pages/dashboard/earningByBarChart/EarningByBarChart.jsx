import React from "react";
import RevenueChart from "./RevenueChart";
import EarningChart from "./EarningChart";
import RechargeChart from "./RechargeChart";
import SubscriptionChart from "./SubscriptionChart";
import RefundChart from "./RefundChart";
import ProfitChart from "./ProfitChart";
import BonusChart from "./BonusChart";
import InAppPurchasesChart from "./InAppPurchasesChart";
import CouponChart from "./CouponChart";
const EarningByBarChart = () => {
  return (
    <>
      <div className="profile-section">
        <div
          className="sub-container"
          // style={{ width: "-webkit-fill-available" }}
        >
          <RevenueChart />
        </div>
        <div
          className="sub-container"
          // style={{ width: "-webkit-fill-available" }}
        >
          <CouponChart />
        </div>
        <div
          className="sub-container"
          // style={{ width: "-webkit-fill-available" }}
        >
          <RefundChart />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="sub-container"
            style={{ width: "-webkit-fill-available" }}
          >
            <RevenueChart />
          </div>
          <div
            className="sub-container"
            style={{ width: "-webkit-fill-available" }}
          >
            <RevenueChart />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <RevenueChart />
          <EarningChart />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <RevenueChart />
          <EarningChart />
        </div>
      </div>
    </>
  );
};

export default EarningByBarChart;
