import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../DashboardSubPage";
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
    <div className="" style={{ height: "100%", paddingLeft: "25px" }}>
      <div className="revenue-card-style" style={{ height: "100%" }}>
        <div className=" dashboard-main-card " style={{ border: "none" }}>
          <h2 className="">Flute Referral/Reference/Coupon Amount</h2>
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
        </div>

        {/* Card Section....................................... */}
        <div className="heading" style={{ marginLeft: "40px" }}>
          <h2>Total Blog and Total Buzz</h2>
        </div>
        <div
          className="consultant-card-container "
          style={{ margin: "40px 0px 0px 40px" }}
        >
          {/* <CategoryCard text={blogBuzzCount.totalBlogs} />
          <CategoryCard text={blogBuzzCount.totalFluteBuzz} /> */}
          <div>
            <div className="active-consultant-card">
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                Total Blogs:
              </span>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                {blogBuzzCount?.totalBlogs}
              </span>
            </div>
          </div>
          <div>
            <div className="active-consultant-card">
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                Total Buzz:
              </span>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                {blogBuzzCount?.totalFluteBuzz}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueByLocation;
