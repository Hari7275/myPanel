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
    return permissions?.["meta_data_section"]?.includes(metadataName);
  };
  // List of all possible metadata items with their routes
  const metadataItems = [
    {
      name: "Coach Categories",
      link: "/coach-category_metadata",
      permissions: "view_coach_categories_list"
    },
    {
      name: "App Languages",
      link: "/language-metadata",
      permissions: "view_app_languages_list"
    },
    {
      name: "Promotional Cards",
      link: "/promotional-card-metadata",
      permissions: "view_promotional_cards_list"
    },
    {
      name: "Dashboard banner",
      link: "/dashboard-banner-metadata",
      permissions: "view_dashboard_banner_list"
    },
    {
      name: "coach skillls",
      link: "/coach-skills-metadata",
      permissions: "view_coach_skills_list"
    },
    {
      name: "Report Reasons",
      link: "/report-reason",
      permissions: "view_report_reasons_list"
    },
    {
      name: "Menu Orders",
      link: "/menu-orders",
      permissions: "view_menu_orders_list"
    },
    {
      name: "Countries List",
      link: "/countries-list",
      permissions: "view_countries_list"
    },
    {
      name: "Consultant Rate",
      link: "/coach-rate",
      permissions: "view_consultant_rate_list"
    },
    {
      name: "Consultant Profile Progress",
      link: "/profile-progress",
      permissions: "view_consultant_profile_progress_list"
    },
    {
      name: "Dashboard Order",
      link: "/dashboard-order",
      permissions: "view_dashboard_order_list"
    }
  ];
  return (
    <>
      <div className="category-card-container-grid">
        {metadataItems.map((item) => (
          hasPermission(item.permissions) && (
            <CategoryCard
              key={item.name}
              link={item.link}
              label={item.name}
            />
          )
        ))}
      </div>
    </>
  );
};

export default MetaDataList;
