import React, { useState } from "react";
import "../../../cssfolder/profileRightComponent.css";
import CoachOverview from "../overview/CoachOverview";
import UpdateInfo from "../info/CoachInfo";
import Gallery from "../gallery/Gallery";
import CoachAccountList from "../account/CoachAccountList";
import Wallet from "../wallet/Wallet";
import CoachFollowers from "../followers/CoachFollowers";
import CoachReviews from "../reviews_notifications/CoachReviewsListingTable";
import CoachOrder from "../orders/CoachOrders";
import CoachGifts from "../Gifts/CoachGifts";
import CoachSetting from "../coachSettings/CoachSetting";
import LiveStream from "../liveStream/LiveStream";
import ConlstProfileProgressList from "../../../_components/reuseComponents/consultantProfileProgress/ConlstProfileProgressList";
import SessionSlot from "../../../_components/reuseComponents/sessionSlot/SessionSlot";
import CoachStatus from "../status/CoachStatus";
import CommissionList from "../../astrologers/astrologerCommission/CommissionList";
import CoachPriceListingTable from "../pricing/CoachPriceListingTable";
import Price from "../pricing/Price";
import ConsultantDeviceInfo from "../../../_components/reuseComponents/ConsultantDeviceInfo";
import OfflineOrder from "../../listeners/orders/OfflineOrder";
import ConsultantBlockedUser from "../../../_components/reuseComponents/ConsultantBlockedUser";

const CoachRightComponent = ({ activeComponent }) => {
  return (
    <>
      <div className="profile-sub-container">
        <div>
          {activeComponent === "Overview" && <CoachOverview />}
          {activeComponent === "UpdateInfo" && <UpdateInfo />}
          {activeComponent === "ConsultantDeviceInfo" && (
            <ConsultantDeviceInfo />
          )}
          {activeComponent === "Gallery" && <Gallery />}
          {activeComponent === "CoacheAccount" && <CoachAccountList />}
          {activeComponent === "Price-chart" && <Price />}
          {activeComponent === "Wallet" && <Wallet />}
          {activeComponent === "CoachOrder" && <CoachOrder />}
          {/* {activeComponent === "OfflineOrder" && <OfflineOrder />} */}
          {activeComponent === "CoachFollowers" && <CoachFollowers />}
          {activeComponent === "CoachReviews" && <CoachReviews />}
          {activeComponent === "CoachGifts" && <CoachGifts />}
          {activeComponent === "CoachSetting" && <CoachSetting />}
          {activeComponent === "LiveStream" && <LiveStream />}
          {activeComponent === "Profile-Progress" && (
            <ConlstProfileProgressList />
          )}
          {activeComponent === "session-slot" && <SessionSlot />}
          {activeComponent === "CoachStatus" && <CoachStatus />}
          {activeComponent === "consultant-commission" && <CommissionList />}
          {activeComponent === "ConsultantBlockedUser" && (
            <ConsultantBlockedUser/>
          )}
        </div>
      </div>
    </>
  );
};

export default CoachRightComponent;
