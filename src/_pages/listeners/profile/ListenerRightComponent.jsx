import React, { useState } from "react";
import ListenerOverview from "../overview/ListenerOverview";
import ListenerInfo from "../info/ListenerInfo";
// import ListenerGallery from "../gallery/ListenerGallery";
import Gallery from "../gallery/Gallery";
import ListenerAccountList from "../account/ListenerAccountList";
import ListenerFollowers from "../followers/ListenerFollowers";
import ListenerOrder from "../orders/ListenerOrder";
import Wallet from "../wallet/Wallet";
import ListenerReviewsListingTable from "../reviews_notification/ListenerReviewsListingTable";
import ListenerSetting from "../listenerSettings/ListenerSetting";
import ConlstProfileProgressList from "../../../_components/reuseComponents/consultantProfileProgress/ConlstProfileProgressList";
import SessionSlot from "../../../_components/reuseComponents/sessionSlot/SessionSlot";

const ListenerRightComponent = ({ activeComponent }) => {
  return (
    <>
      <div className="profile-sub-container">
        <div>
          {activeComponent === "ListenerOverview" && <ListenerOverview />}
          {activeComponent === "ListenerInfo" && <ListenerInfo />}
          {activeComponent === "Gallery" && <Gallery />}
          {activeComponent === "ListenerAccount" && <ListenerAccountList />}
          {activeComponent === "ListenerFollowers" && <ListenerFollowers />}
          {activeComponent === "ListenerReviewsListingTable" && (
            <ListenerReviewsListingTable />
          )}
          {activeComponent === "ListenerOrder" && <ListenerOrder />}
          {activeComponent === "Wallet" && <Wallet />}
          {activeComponent === "ListenerSetting" && <ListenerSetting />}
          {activeComponent === "Profile-Progress" && (
            <ConlstProfileProgressList />
          )}
          {activeComponent === "session-slot" && <SessionSlot />}
        </div>
      </div>
    </>
  );
};

export default ListenerRightComponent;
