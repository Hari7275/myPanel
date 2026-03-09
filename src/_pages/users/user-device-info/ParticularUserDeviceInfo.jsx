import React, { useState, useEffect } from "react";

import { useGetParticularUserDeviceTokenQuery } from "../../../_store/api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

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

const ParticularUserDeviceInfo = () => {
  const { userId } = useParams();

  // const userId = useSelector((state) => state.user.userData);

  const { data: fetchData, isLoading } =
    useGetParticularUserDeviceTokenQuery(userId);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setDeviceInfo(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading && !deviceInfo) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
      </span>
    );
  }

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "N/A";
    }
    return format(new Date(date), "PPpp");
  };

  const getPlatformName = (platform) => {
    switch (platform) {
      case "1":
        return "Android";
      case "2":
        return "iOS";
      default:
        return platform || "N/A";
    }
  };

  return (
    <>
      <div className="userProfile-container profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <InfoItem
              label="Device ID"
              value={deviceInfo?.device_id || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="Device Name"
              value={deviceInfo?.device_name || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="Device Model"
              value={deviceInfo?.device_model || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="Device Brand"
              value={deviceInfo?.device_brand || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="Platform"
              value={getPlatformName(deviceInfo?.platform)}
            />
            <div className="line"></div>

            <InfoItem
              label="OS Version"
              value={
                deviceInfo?.os_version
                  ? `Android ${deviceInfo.os_version}`
                  : "N/A"
              }
            />
            <div className="line"></div>

            <InfoItem
              label="App Version"
              value={deviceInfo?.app_version || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="App Build Number"
              value={deviceInfo?.app_build_number || "N/A"}
            />
            <div className="line"></div>

            <InfoItem
              label="FCM Token"
              value={
                deviceInfo?.fcm_token
                  ? `${deviceInfo.fcm_token.substring(0, 20)}...`
                  : "N/A"
              }
            />
            <div className="line"></div>

            <InfoItem
              label="Primary Device"
              value={deviceInfo?.is_primary ? "Yes" : "No"}
            />
            <div className="line"></div>

            <InfoItem
              label="Active Status"
              value={deviceInfo?.is_active ? "Active" : "Inactive"}
            />
            <div className="line"></div>

            <InfoItem
              label="Login Count"
              value={deviceInfo?.login_count || "0"}
            />
            <div className="line"></div>

            <InfoItem
              label="Last Active"
              value={formatDate(deviceInfo?.last_active)}
            />
            <div className="line"></div>

            <InfoItem
              label="FCM Token Updated"
              value={formatDate(deviceInfo?.fcm_token_updated_at)}
            />
            <div className="line"></div>

            <InfoItem
              label="Created At"
              value={formatDate(deviceInfo?.created_at)}
            />

            <InfoItem
              label="Last Update"
              value={formatDate(deviceInfo?.updated_at)}
            />
            <div className="line"></div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ParticularUserDeviceInfo;
