import React, { useState } from "react";
import ListenerOverview from "../overview/ListenerOverview";
import ListenerInfo from "../info/ListenerInfo";
// import ListenerGallery from "../gallery/ListenerGallery";
import Gallery from "../gallery/Gallery";
import ListenerAccountList from "../bankAccount/ListenerAccountList";
import ListenerFollowers from "../followers/ListenerFollowers";
import ListenerOrder from "../orders/ListenerOrder";
import Wallet from "../wallet/Wallet";
import ListenerReviewsListingTable from "../reviews_notification/ListenerReviewsListingTable";
import ListenerSetting from "../listenerSettings/ListenerSetting";
import ConlstProfileProgressList from "../../../_components/reuseComponents/consultantProfileProgress/ConlstProfileProgressList";
// import SessionSlot from "../../../_components/reuseComponents/sessionSlot/SessionSlot";
import CoachStatus from "../../coaches/status/CoachStatus";
import CommissionList from "../../astrologers/astrologerCommission/CommissionList";

import ListenersPriceListingTable from "../pricing/ListenersPriceListingTable";

const ListenerRightComponent = ({ activeComponent }) => {
  const [listenerType, setListenerType] = useState("listenerstatus");

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
          {activeComponent === "consultant-commission" && <CommissionList />}
          {activeComponent === "Price-chart" && <ListenersPriceListingTable />}

          {/* {activeComponent === "session-slot" && <SessionSlot />} */}
          {activeComponent === "CoachStatus" && (
            <CoachStatus listenerType={listenerType} />
          )}
        </div>
      </div>
    </>
  );
};

export default ListenerRightComponent;
