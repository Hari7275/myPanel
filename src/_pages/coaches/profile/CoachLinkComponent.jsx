import React from "react";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const CoachLinkComponent = ({ onComponentChange, activeComponent }) => {
  const permissions = usePermissions();

  // Mapping of components to their respective permissions
  const menuItems = [
    {
      component: "Overview",
      label: "Overview",
      permission: "view_coach_profile_overview",
    },
    {
      component: "UpdateInfo",
      label: "Update Info",
      permission: "view_coach_profile_info",
    },
    {
      component: "ConsultantDeviceInfo",
      label: "Consultant Device Info",
      permission: "view_coach_profile_info",
    },
    {
      component: "Profile-Progress",
      label: "Onboarding Progress",
      permission: "view_coach_profile_onboarding_progress",
    },
    {
      component: "Gallery",
      label: "Gallery",
      permission: "view_coach_profile_gallery",
    },
    {
      component: "CoachOrder",
      label: "Orders",
      permission: "view_coach_profile_orders",
    },
    // {
    //   component: "OfflineOrder",
    //   label: "Offline Order",
    //   permission: "view_coach_profile_orders",
    // },
    {
      component: "CoachGifts",
      label: "Gifts",
      permission: "view_coach_profile_gift",
    },
    {
      component: "session-slot",
      label: "Appointment Session",
      permission: "view_coach_profile_appointment_session",
    },
    {
      component: "LiveStream",
      label: "Live Stream",
      permission: "view_coach_profile_livestream",
    },
    {
      component: "CoachFollowers",
      label: "Followers",
      permission: "view_coach_profile_followers",
    },
    {
      component: "CoachReviews",
      label: "Reviews",
      permission: "view_coach_profile_reviews",
    },
    {
      component: "CoacheAccount",
      label: "Bank Details",
      permission: "view_coach_profile_bank_details",
    },
    {
      component: "Price-chart",
      label: "Price Chart",
      permission: "view_coach_profile_price_chart",
    },
    {
      component: "Wallet",
      label: "Wallet",
      permission: "view_coach_profile_wallet",
    },
    {
      component: "consultant-commission",
      label: "Flute Commission",
      permission: "view_coach_profile_flute_commission",
    },
    {
      component: "CoachStatus",
      label: "Service Status",
      permission: "view_coach_profile_service_status",
    },

    {
      component: "ConsultantBlockedUser",
      label: "Blocked User",
      permission: "view_coach_profile_service_status",
    },
  ];

  return (
    <>
      <header className="vertical-nav">
        {menuItems.map((item) => {
          // Check if user has permission for this item
          const hasPermission = permissions?.coach?.includes(item.permission);

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
      </header>
    </>
  );
};

export default CoachLinkComponent;
