import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../SuperadminDashboard";
import "../CategoriesList.css";
import {
  useGetFluteMagzineAndBuzzCountQuery,
  useGetFluteRefferalAmountQuery,
} from "../../../_store/api";

const RevenueByLocation = () => {
  const [blogBuzzCount, setBlogBuzzCount] = useState("");
  const [fluteRefAmt, setFluteRefAmt] = useState([]);

  const { data: fetchData } = useGetFluteMagzineAndBuzzCountQuery();
  const { data: FluteReferralAmt } = useGetFluteRefferalAmountQuery();

  useEffect(() => {
    if (fetchData) {
      setBlogBuzzCount(fetchData.data);
    }

    if (FluteReferralAmt && FluteReferralAmt?.data) {
      setFluteRefAmt(FluteReferralAmt?.data);
    }
  }, [fetchData, FluteReferralAmt]);

  return (
    <div className="dashboard-card-style" style={{ padding: "20px" }}>
      <h2 style={{ color: "var(--dashboard-heading-color)", fontWeight: 700, marginBottom: "12px" }}>
        Flute Referral/Reference/Coupon Amount
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {fluteRefAmt.map((item) => (
          <CategoryCard
            key={item.title}
            label={item.name}
            price={item.value}
            bgcolor={item.color}
          />
        ))}
      </div>

      <h2 style={{ color: "var(--dashboard-heading-color)", fontWeight: 700, margin: "20px 0 12px" }}>
        Total Blog and Total Buzz
      </h2>
      <div style={{ display: "flex", gap: "16px" }}>
        <div
          className="active-consultant-card"
          style={{ backgroundColor: "var(--dashboard-blog-bg)", color: "var(--text-primary)" }}
        >
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Total Blogs:</span>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>{blogBuzzCount?.totalBlogs}</span>
        </div>
        <div
          className="active-consultant-card"
          style={{ backgroundColor: "var(--dashboard-buzz-bg)", color: "var(--text-primary)" }}
        >
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Total Buzz:</span>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>{blogBuzzCount?.totalFluteBuzz}</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueByLocation;
