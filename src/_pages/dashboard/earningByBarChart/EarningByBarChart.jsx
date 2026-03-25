import "./earningByBarChart.css";
import RevenueChart from "./RevenueChart";
import CouponChart from "./CouponChart";
import TransactionGraphInline from "../TransactionGraphInline";

const EarningByBarChart = () => {
  return (
    <div className="oa-overview-content">
      <RevenueChart />
      <CouponChart />
      <TransactionGraphInline />
    </div>
  );
};

export default EarningByBarChart;
