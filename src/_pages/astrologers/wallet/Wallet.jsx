import React, { useState } from "react";
import AstrologerWallet from "./AstrologerWallet";
import WalletDetails from "./WalletDetails";

const Wallet = () => {
  const [activeComponent, setActiveComponent] = useState("AstrologerWallet");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="profile-sub-container ProfileData-container sub-container">
        <header
          className="profile-mainContainer "
          style={{ margin: "-20px 0px 20px -35px" }}
        >
          <div
            className={`profile-link ${
              activeComponent === "WalletDetails" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("WalletDetails")}
          >
            <span>Wallet Details</span>
          </div>

          <div
            className={`profile-link ${
              activeComponent === "AstrologerWallet" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("AstrologerWallet")}
          >
            <span>Wallet Transactions</span>
          </div>
        </header>

        <div>
          {activeComponent === "AstrologerWallet" && <AstrologerWallet />}
          {activeComponent === "WalletDetails" && <WalletDetails />}
        </div>
      </div>
    </>
  );
};

export default Wallet;
