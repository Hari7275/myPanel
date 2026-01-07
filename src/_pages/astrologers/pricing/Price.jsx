import React, { useState } from "react";

import AstrologerPriceListingTable from "./AstrologerPriceListingTable";
import PriceDetails from "../../listeners/pricing/PriceDetails";
import PriceChange from "../../listeners/pricing/priceChange/PriceChange";

const Price = () => {
  const [activeComponent, setActiveComponent] = useState(
    "AstrologerPriceListingTable"
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
              activeComponent === "AstrologerPriceListingTable"
                ? "subactive"
                : ""
            }`}
            onClick={() => handleComponentChange("AstrologerPriceListingTable")}
          >
            <span>Price Chart</span>
          </div>

          <div
            className={`profile-link ${
              activeComponent === "PriceChange" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("PriceChange")}
          >
            <span>Price Change</span>
          </div>
        </header>

        <div>
          {activeComponent === "AstrologerPriceListingTable" && (
            <AstrologerPriceListingTable />
          )}
          {activeComponent === "PriceDetails" && <PriceDetails />}
          {activeComponent === "PriceChange" && <PriceChange />}
        </div>
      </div>
    </>
  );
};

export default Price;
