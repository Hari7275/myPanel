import React from "react";
import AstrologerOverview from "../overview/AstrologerOverview";
import AstrologerInfo from "../info/AstrologerInfo";
// import AstrologerGallery from '../gallery/AstrologerGallery';
import Gallery from "../gallery/Gallery";
import AstrologerAccountList from "../account/AstrologerAccountList";
import AstrologerFollowers from "../followers/AstrologerFollowers";
import AstrologerOrder from "../orders/AstrologerOrder";
import Wallet from "../wallet/Wallet";
import AstroReviewsListingTable from "../reviews_notifications/AstroReviewsListingTable";
import AstrologerGifts from "../Gifts/AstrologerGifts";
import AstrologerSetting from "../astrologerSettings/AstrologerSetting";
import ConlstProfileProgressList from "../../../_components/reuseComponents/consultantProfileProgress/ConlstProfileProgressList";
import SessionSlot from "../../../_components/reuseComponents/sessionSlot/SessionSlot";
import LiveStream from "../../coaches/liveStream/LiveStream";
import CoachStatus from "../../coaches/status/CoachStatus";
import CommissionList from "../astrologerCommission/CommissionList";

const AstrologerRightComponent = ({ activeComponent }) => {
  return (
    <>
      <div className="profile-sub-container">
        <div>
          {activeComponent === "Overview" && <AstrologerOverview />}
          {activeComponent === "AstrologerInfo" && <AstrologerInfo />}
          {activeComponent === "Gallery" && <Gallery />}
          {activeComponent === "account" && <AstrologerAccountList />}
          {activeComponent === "AstrologerFollowers" && <AstrologerFollowers />}

          {activeComponent === "AstrologerOrder" && <AstrologerOrder />}
          {activeComponent === "Wallet" && <Wallet />}
          {activeComponent === "AstroReviewsListingTable" && (
            <AstroReviewsListingTable />
          )}
          {activeComponent === "AstrologerGifts" && <AstrologerGifts />}
          {activeComponent === "AstrologerSetting" && <AstrologerSetting />}
          {activeComponent === "live-stream" && <LiveStream />}
          {activeComponent === "Profile-Progress" && (
            <ConlstProfileProgressList />
          )}

          {activeComponent === "session-slot" && <SessionSlot />}
          {activeComponent === "CoachStatus" && <CoachStatus />}
          {activeComponent === "consultant-commission" && <CommissionList />}
        </div>
      </div>
    </>
  );
};

export default AstrologerRightComponent;
