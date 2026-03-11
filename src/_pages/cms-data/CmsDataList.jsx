import React from "react";

import { Link } from "react-router-dom";
import usePermissions from "../../_components/reuseComponents/permission/EmpPermission";

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
const CmsDataList = () => {
  const permissions = usePermissions();
  // Permission check function
  const hasPermission = (metadataName) => {
    return permissions?.["meta_data_section"]?.includes(metadataName);
  };
  // List of all possible metadata items with their routes
  const metadataItems = [
    {
      name: "Dasboard Web Banner",
      link: "/cms-dashboard-banner",
      permissions: "view_coach_categories_list",
    },
    {
      name: "Social Icons",
      link: "/cms-social-icons",
      permissions: "view_app_languages_list",
    },
    {
      name: "Blog List",
      link: "/cms-blog-list",
      permissions: "view_promotional_cards_list",
    },
    {
      name: "Blog Categories List",
      link: "/cms-categories-list",
      permissions: "view_promotional_cards_list",
    },
    {
      name: "Author List",
      link: "/cms-author-list",
      permissions: "view_promotional_cards_list",
    },
    {
      name: "FAQs List",
      link: "/cms-faq-list",
      permissions: "view_promotional_cards_list",
    },
    {
      name: "Buzz List",
      link: "/cms-buzz-list",
      permissions: "view_promotional_cards_list",
    },

    {
      name: "Page Manager",
      link: "/cms-page-manager",
      permissions: "view_promotional_cards_list",
    },

    {
      name: " Photo guidelines (C)",
      link: "/cms-consultant-photo-guidelines",
      permissions: "view_promotional_cards_list",
    },

    {
      name: "The App Page",
      link: "/cms-the-app-page",
      permissions: "view_promotional_cards_list",
    },

    {
      name: "Testimonial",
      link: "/cms-testimonial",
      permissions: "view_promotional_cards_list",
    },
    {
      name: "Listener Banner",
      link: "/cms-listener-banner",
      permissions: "view_promotional_cards_list",
    },
    // {
    //   name: "coach skillls",
    //   link: "/coach-skills-metadata",
    //   permissions: "view_coach_skills_list",
    // },
    // {
    //   name: "Report Reasons",
    //   link: "/report-reason",
    //   permissions: "view_report_reasons_list",
    // },
    // {
    //   name: "Menu Orders",
    //   link: "/menu-orders",
    //   permissions: "view_menu_orders_list",
    // },
    // {
    //   name: "Countries List",
    //   link: "/countries-list",
    //   permissions: "view_countries_list",
    // },
    // {
    //   name: "Consultant Rate",
    //   link: "/coach-rate",
    //   permissions: "view_consultant_rate_list",
    // },
    // {
    //   name: "Consultant Profile Progress",
    //   link: "/profile-progress",
    //   permissions: "view_consultant_profile_progress_list",
    // },
    // {
    //   name: "Dashboard Order",
    //   link: "/dashboard-order",
    //   permissions: "view_dashboard_order_list",
    // },
    // {
    //   name: "App Version",
    //   link: "/app-version",
    //   permissions: "view_dashboard_order_list",
    // },
  ];
  return (
    <>
      <div className="meta-card-container-grid">
        {metadataItems.map(
          (item) => (
            // hasPermission(item?.permissions) && (
            <CategoryCard key={item.name} link={item.link} label={item.name} />
          ),
          // )
        )}
      </div>
    </>
  );
};

export default CmsDataList;
