import React from "react";

import { Link } from "react-router-dom";

const CategoryCard = ({ link, label }) => (
  <div className="card-container">
    {link ? (
      <Link to={link}>
        <span className="card category-card">{label}</span>
      </Link>
    ) : (
      <div className="card category-card">
        <span>{label}</span>
      </div>
    )}
  </div>
);

const SupportSection = () => {
  return (
    <>
      <div className="profile-section">
        <div className="profileMainComponent">
          <div className="profileheader">Support Section</div>

          <div className="divider"></div>
        </div>

        <div className="category-card-container-grid">
          <CategoryCard link="/support-question" label="Support Question" />
          <CategoryCard link="/Support-executive" label="Support Executive" />
          <CategoryCard
            link="/user-support-request"
            label="User Support Request"
          />
        </div>
      </div>
    </>
  );
};

export default SupportSection;
