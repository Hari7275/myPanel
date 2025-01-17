// Breadcrumbs.js
import React from "react";
import { Link } from "react-router-dom";
import "../cssfolder/Breadcrumbs.css";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>
          {crumb.path ? (
            <Link to={crumb.path}>{crumb.name}</Link>
          ) : (
            <span>{crumb.name}</span>
          )}
          {index < breadcrumbs.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
