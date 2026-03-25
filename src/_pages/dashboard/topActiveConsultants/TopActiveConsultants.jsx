import React, { useEffect, useState } from "react";
import "../CategoriesList.css";
import { useGetFluteMostActiveConsultantQuery } from "../../../_store/api";
import { Link } from "react-router-dom";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

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
  const permissions = usePermissions();
  const canNavigate = permissions?.["consultant"]?.includes("view_consultant_profile");
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
    <div className="dashboard-card-style" style={{ padding: "20px" }}>
      <div className="top-active-consultant" style={{ marginBottom: "16px" }}>
        <h2>Top Active Consultants</h2>
      </div>

      {/* Image Section...................................... */}
      <div className="tac-grid">
        {activeConsultant?.map((item) => {
          const consultantType = item?.consultant?.consultant_type;
          const consultantId = item?.consultant_id;

          const navigationRoute = {
            1: `/astrologer/${consultantId}`,
            2: `/coaches/${consultantId}`,
            3: `/listeners/${consultantId}`,
          };

          const route = consultantType && navigationRoute[consultantType];

          const cardContent = (
            <>
              <img
                src={item?.consultant?.profile_pic || "/avatar11.png"}
                alt={item?.consultant?.consultant_type}
                className="tac-avatar"
              />
              <span className="tac-name">{item?.consultant?.first_name}</span>
              <div className="tac-info">
                <span className="tac-meta">ID: {consultantId}</span>
                <span className="tac-meta">Orders: {item?.total_count}</span>
              </div>
            </>
          );

          if (!canNavigate) {
            return (
              <div key={item?.id} className="tac-card">
                {cardContent}
              </div>
            );
          }

          return (
            <Link
              key={item?.id}
              to={route}
              className="tac-card"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopActiveConsultants;
