import React from "react";
import "./CatergoriesList.css";
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
const MetaDataList = () => {
  return (
    <>
      <div className="category-card-container-grid">
        <CategoryCard
          link="/coach-category_metadata"
          label="Coach Categories"
        />
        <CategoryCard link="/language-metadata" label="App Languages" />
        <CategoryCard
          link="/promotional-card-metadata"
          label="Promotional Cards"
        />
        <CategoryCard
          link="/dashboard-banner-metadata"
          label="Dashboard Banner"
        />
        <CategoryCard
          link="/magazine-categories-metadata"
          label=" Flute Magzine Categories"
        />
        <CategoryCard link="/coach-skills-metadata" label=" Coach skills" />
        <CategoryCard link="/report-reason" label=" Report Reasons" />
        <CategoryCard link="/consultant-service-rate" label="Service Rate" />
        <CategoryCard link="/menu-orders" label="Menu Orders" />
        <CategoryCard link="/countries-list" label="Countries List" />
        <CategoryCard link="/consultant-notice" label="Consultant Notice" />
        <CategoryCard link="/coach-rate" label="Consultant Rate" />
      </div>
    </>
  );
};

export default MetaDataList;
