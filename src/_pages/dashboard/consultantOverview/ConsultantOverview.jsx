import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./CategoriesList.css";
import { useGetFluteConsultantOverviewQuery } from "../../../_store/api";

export const CategoryCard = ({ link, label, value, bgcolor }) => (
  <div>
    <div
      className="dashboard-sub-card"
      style={{ backgroundColor: bgcolor, boxShadow: "none" }}
    >
      <span style={{ fontSize: "20px", fontWeight: "600" }}>{label}</span>
      <span style={{ fontSize: "24px", fontWeight: "700" }}>{value}</span>
    </div>
  </div>
);

const ConsltantOverview = () => {
  const [overviewItems, setOverviewItems] = useState([]);
  const { data: fetchData, isLoading } = useGetFluteConsultantOverviewQuery();

  useEffect(() => {
    if (fetchData) {
      setOverviewItems(fetchData.data);
    }
  }, [fetchData]);

  return (
    <>
      <div className="useroverview" style={{ paddingLeft: "25px" }}>
        <span>
          <h2 style={{ padding: "15px 5px" }}>Consultant Overview</h2>
        </span>
        <div
          className="dashboard-card-container-grid"
          style={{ marginTop: "10px" }}
        >
          {overviewItems.map((item) => (
            <CategoryCard
              key={item.name}
              label={item.name}
              value={item.value}
              bgcolor={item.color}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConsltantOverview;
