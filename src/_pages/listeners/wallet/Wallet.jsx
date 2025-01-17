import React, { useState } from "react";
import ListenerWallet from "./ListenerWallet";
import WalletDetails from "./WalletDetails";

const Wallet = () => {
  const [activeComponent, setActiveComponent] = useState("ListenerWallet");

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
              activeComponent === "ListenerWallet" ? "subactive" : ""
            }`}
            onClick={() => handleComponentChange("ListenerWallet")}
          >
            <span>Wallet Transactions</span>
          </div>
        </header>

        <div>
          {activeComponent === "ListenerWallet" && <ListenerWallet />}
          {activeComponent === "WalletDetails" && <WalletDetails />}
        </div>
      </div>
    </>
  );
};

export default Wallet;
