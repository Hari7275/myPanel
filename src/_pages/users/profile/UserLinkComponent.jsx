import React from "react";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const UserLinkComponent = ({ onComponentChange, activeComponent }) => {
  const permissions = usePermissions();

  // Mapping of components to their respective permissions
  const menuItems = [
    {
      component: "UserOverview",
      label: "Overview",
      permission: "view_user_profile_overview",
    },
    {
      component: "UserInfo",
      label: "User Info",
      permission: "view_user_profile_user_info",
    },
    {
      component: "UserData",
      label: "User Data",
      permission: "view_user_profile_dating_info",
    },
    {
      component: "ParticularUserDeviceInfo",
      label: "User Device Info",
      permission: "view_user_profile_user_info",
    },
    {
      component: "UserSubscription",
      label: "Subscription",
      permission: "view_user_profile_subscriptions",
    },
    {
      component: "UserGalllery",
      label: "Gallery",
      permission: "view_user_profile_gallery",
    },
    {
      component: "UserTransactionList",
      label: "Transaction List",
      permission: "view_user_profile_transaction_list",
    },
    {
      component: "UserRegulation",
      label: "User Regulation",
      permission: "view_user_profile_status",
    },
    {
      component: "QuickDate",
      label: "Quick Date",
      permission: "view_user_profile_dating_info",
    },
    {
      component: "Discovery",
      label: "Discovery",
      permission: "view_user_profile_dating_info",
    },
    {
      component: "UserDatingStatus",
      label: "User Type & Dating Status",
      permission: "view_user_profile_dating_info",
    },
    {
      component: "UserBankDetails",
      label: "User Bank Details",
      permission: "view_user_profile_dating_info",
    },
  ];

  return (
    <>
      <div className="vertical-nav">
        {menuItems.map((item) => {
          // Check if user has permission for this item
          const hasPermission = permissions?.user?.includes(item.permission);

          // Skip rendering if no permission
          if (!hasPermission) return null;

          return (
            <div
              key={item.component}
              className={`nav-link ${
                activeComponent === item.component ? "active" : ""
              }`}
              onClick={() => onComponentChange(item.component)}
            >
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
      {/* <div className="vertical-nav">
        <div
          className={`nav-link ${activeComponent === "UserOverview" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserOverview")}
        >
          <span>Overview</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserInfo" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserInfo")}
        >
          <span>User Info</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserData" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserData")}
        >
          <span>User Data</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserSubscription" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserSubscription")}
        >
          <span>Subscription</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserGalllery" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserGalllery")}
        >
          <span>Gallery</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserTransactionList" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserTransactionList")}
        >
          <span>Transaction List</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserRegulation" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserRegulation")}
        >
          <span>User Regulation</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "QuickDate" ? "active" : ""
            }`}
          onClick={() => onComponentChange("QuickDate")}
        >
          <span>Quick Date</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "Discovery" ? "active" : ""
            }`}
          onClick={() => onComponentChange("Discovery")}
        >
          <span>Discovery</span>
        </div>
        <div
          className={`nav-link ${activeComponent === "UserDatingStatus" ? "active" : ""
            }`}
          onClick={() => onComponentChange("UserDatingStatus")}
        >
          <span>User Type & Dating Status</span>
        </div>
      </div> */}
    </>
  );
};

export default UserLinkComponent;
