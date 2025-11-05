import React, { useEffect, useState } from "react";
import "../CategoriesList.css";
import { useGetFluteMostActiveConsultantQuery } from "../../../_store/api";
import { Link } from "react-router-dom";

export const CategoryCard = ({ src, count, text }) => (
  <div>
    <div className="active-consultant-card">
      <img
        src={src}
        alt="card-icon"
        style={{ width: "40px", height: "40px" }}
      />
      <span style={{ fontSize: "24px", fontWeight: "700" }}>{count}</span>
      <span style={{ fontSize: "20px", fontWeight: "600" }}>{text}</span>
    </div>
  </div>
);

const TopActiveConsultants = () => {
  const [activeConsultant, setActiveConsultant] = useState([]);
  const { data: fetchData } = useGetFluteMostActiveConsultantQuery();

  useEffect(() => {
    if (fetchData?.data) {
      setActiveConsultant(fetchData.data);
    } else {
      setActiveConsultant([]);
    }
  }, [fetchData]);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <div className="top-active-consultant">
        <h2>Top Active Consultants</h2>
      </div>

      {/* Image Section...................................... */}
      <div className="top-active-image-container">
        {activeConsultant?.map((item) => {
          const consultantType = item?.consultant?.consultant_type;
          const consultantId = item?.consultant_id;

          // ✅ Build dynamic route based on type
          const navigationRoute = {
            1: `/astrologer/${consultantId}`,
            2: `/coaches/${consultantId}`,
            3: `/listeners/${consultantId}`,
          };

          const route = consultantType && navigationRoute[consultantType];

          return (
            <Link
              key={item?.id}
              to={route}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="image-wrapper">
                <img
                  src={item?.consultant?.profile_pic || "/avatar11.png"}
                  alt={item?.consultant?.consultant_type}
                  className="consultant-image"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h3>{item?.consultant?.first_name}</h3>
                  <h3>Id: {consultantId}</h3>
                  <h3>Order: {item?.total_count}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopActiveConsultants;
