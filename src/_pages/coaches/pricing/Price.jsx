import React, { useState } from "react";

import CoachPriceListingTable from "./CoachPriceListingTable";
import PriceDetails from "../../listeners/pricing/PriceDetails";

const Price = () => {
  const [activeComponent, setActiveComponent] = useState(
    "CoachPriceListingTable"
  );

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-sub-container ProfileData-container profile-right-sub-container">
        <header
          className="profile-mainContainer "
          style={{ margin: "-20px 0px 20px -35px" }}
        >
          <div
            className={`profile-link ${
              activeComponent === "PriceDetails" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("PriceDetails")}
          >
            <span>Price Details</span>
          </div>

          <div
            className={`profile-link ${
              activeComponent === "CoachPriceListingTable" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("CoachPriceListingTable")}
          >
            <span>Price Chart</span>
          </div>
        </header>

        <div>
          {activeComponent === "CoachPriceListingTable" && (
            <CoachPriceListingTable />
          )}
          {activeComponent === "PriceDetails" && <PriceDetails />}
        </div>
      </div>
    </>
  );
};

export default Price;
