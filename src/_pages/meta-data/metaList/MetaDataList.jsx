import React from "react";
import "./CatergoriesList.css";
import { Link } from "react-router-dom";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

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
  const permissions = usePermissions();
  // Permission check function
  const hasPermission = (metadataName) => {
    return permissions?.["meta data"]?.includes(metadataName);
  };
  // List of all possible metadata items with their routes
  const metadataItems = [
    { name: "Coach Categories", link: "/coach-category_metadata" },
    { name: "App Languages", link: "/language-metadata" },
    { name: "Promotional Cards", link: "/promotional-card-metadata" },
    { name: "Dashboard banner", link: "/dashboard-banner-metadata" },
    { name: "writer", link: "/writer-metadata" },
    { name: "coach skillls", link: "/coach-skills-metadata" },
    { name: "Flute Magzine Categories", link: "/magazine-categories-metadata" },
    { name: "Report Reasons", link: "/report-reason" },
    { name: "Menu Orders", link: "/menu-orders" },
    { name: "Countries List", link: "/countries-list" },
    { name: "Consultant Rate", link: "/coach-rate" },
    { name: "Consultant Profile Progress", link: "/profile-progress" },
    { name: "Dashboard Order", link: "/dashboard-order" }
  ];
  return (
    <>
      <div className="category-card-container-grid">
        {metadataItems.map((item) => (
          hasPermission(item.name) && (
            <CategoryCard
              key={item.name}
              link={item.link}
              label={item.name}
            />
          )
        ))}
      </div>
    </>
    // <>
    //   <div className="category-card-container-grid">
    //     <CategoryCard
    //       link="/coach-category_metadata"
    //       label="Coach Categories"
    //     />
    //     <CategoryCard link="/language-metadata" label="App Languages" />
    //     <CategoryCard
    //       link="/promotional-card-metadata"
    //       label="Promotional Cards"
    //     />
    //     <CategoryCard
    //       link="/dashboard-banner-metadata"
    //       label="Dashboard Banner"
    //     />
    //     {/* <CategoryCard
    //       link="/magazine-categories-metadata"
    //       label=" Flute Magzine Categories"
    //     /> */}
    //     <CategoryCard link="/coach-skills-metadata" label=" Coach skills" />
    //     <CategoryCard link="/report-reason" label=" Report Reasons" />
    //     {/* <CategoryCard link="/consultant-service-rate" label="Service Rate" /> */}
    //     <CategoryCard link="/menu-orders" label="Menu Orders" />
    //     <CategoryCard link="/countries-list" label="Countries List" />
    //     {/* <CategoryCard link="/consultant-notice" label="Consultant Notice" /> */}
    //     <CategoryCard link="/coach-rate" label="Consultant Rate" />
    //     <CategoryCard
    //       link="/profile-progress"
    //       label="Consultant Profile Progress"
    //     />
    //     <CategoryCard link="/dashboard-order" label="Dashboard Order" />
    //   </div>
    // </>
  );
};

export default MetaDataList;
