import React from "react";
import UserOverview from "../overview/UserOverview";
import UserInfo from "../info/UserInfo";
// import UserGalllery from "../gallery/UserGalllery";
import Gallery from "../gallery/Gallery";
import UserData from "../userdata/UserData";
import UserSubscription from "../subscription/UserSubscription";
import UserTransactionList from "../transactionlist/UserTransactionList";
import Discovery from "../discoveryMicroservice/Discovery";
import QuickDate from "../quickDates/QuickDate";

import UserRegulation from "../regulation/UserRegulation";
import UserDatingStatus from "../datingStatus/UserDatingStatus";
import UserBankDetails from "../bankDetails/UserBankDetails";
import ParticularUserDeviceInfo from "../user-device-info/ParticularUserDeviceInfo";
import UserDatingInfo from "../info/UserDatingInfo";

const UserRightComponent = ({ activeComponent }) => {
  return (
    <>
      <div className="profile-right-container">
        <div>
          {activeComponent === "UserOverview" && <UserOverview />}
          {activeComponent === "UserInfo" && <UserInfo />}
          {activeComponent === "UserDatingInfo" && <UserDatingInfo />}
          {activeComponent === "ParticularUserDeviceInfo" && (
            <ParticularUserDeviceInfo />
          )}
          {activeComponent === "UserData" && <UserData />}
          {/* {activeComponent === "UserGalllery" && <UserGalllery />} */}
          {activeComponent === "UserGalllery" && <Gallery />}
          {activeComponent === "UserSubscription" && <UserSubscription />}
          {/* {activeComponent === "MeetupTrips" && <MeetupTrips />} */}
          {activeComponent === "UserTransactionList" && <UserTransactionList />}
          {activeComponent === "QuickDate" && <QuickDate />}
          {activeComponent === "Discovery" && <Discovery />}

          {activeComponent === "UserRegulation" && <UserRegulation />}
          {activeComponent === "UserDatingStatus" && <UserDatingStatus />}
          {activeComponent === "UserBankDetails" && <UserBankDetails />}
        </div>
      </div>
    </>
  );
};

export default UserRightComponent;
