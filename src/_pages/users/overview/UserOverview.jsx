import React, { useState, useEffect } from "react";
import "../../../cssfolder/UserProfile.css";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";

const InfoItem = ({ label, value }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const UserOverview = () => {
  const userId = useSelector((state) => state.user.userData);

  const { data: fetchData, isLoading } = useGetUserListQuery(userId);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setUserData(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading && !userData) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "N/A";
    }
    return format(new Date(date), "PPpp");
  };

  return (
    <>
      <div className="userProfile-container profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <InfoItem label="Eduction" value={userData?.education || "N/A"} />
            <div className="line"></div>

            <InfoItem label="Job" value={userData?.job || "N/A"} />
            <div className="line"></div>

            <InfoItem
              label="Date Of Birth"
              value={userData?.date_of_birth || "N/A"}
            />
            <div className="line"></div>

            <InfoItem label="User Bio " value={userData?.bio || "N/A"} />
            <div className="line"></div>

            <InfoItem
              label="Live Loaction"
              value={userData?.live_location || "N/A"}
            />
            <div className="line"></div>

            <InfoItem label="Country" value={userData?.country || "N/A"} />
            <div className="line"></div>

            <InfoItem
              label="Current Address"
              value={userData?.current_address || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="Permanent Address"
              value={userData?.permanent_address || "N/A"}
            />
            <div className="line"></div>

            {/* <InfoItem
              label="Remaining Balance"
              value={`₹ ${userData.latest_balance.remaining_balance}`}
            />
            <div className="line"></div> */}

            <InfoItem
              label="Spotlight  "
              value={userData?.is_in_spotlight ? "Yes" : "No"}
            />
            <div className="line"></div>

            <InfoItem
              label="Spotlight Time "
              value={userData?.spotlight_time || 0}
            />
            <div className="line"></div>

            <InfoItem
              label="Last Active "
              value={formatDate(userData?.updatedAt)}
            />
            <div className="line"></div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default UserOverview;
