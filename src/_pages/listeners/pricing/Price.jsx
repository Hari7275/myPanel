import React, { useState } from "react";
import ListenersPriceListingTable from "./ListenersPriceListingTable";
import PriceDetails from "./PriceDetails";
import PriceChange from "./priceChange/PriceChange";

const Price = () => {
  const [activeComponent, setActiveComponent] = useState(
    "ListenersPriceListingTable"
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
              activeComponent === "ListenersPriceListingTable"
                ? "subactive"
                : ""
            }`}
            onClick={() => handleComponentChange("ListenersPriceListingTable")}
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
          {activeComponent === "ListenersPriceListingTable" && (
            <ListenersPriceListingTable />
          )}
          {activeComponent === "PriceDetails" && <PriceDetails />}
          {activeComponent === "PriceChange" && <PriceChange />}
        </div>
      </div>
    </>
  );
};

export default Price;
