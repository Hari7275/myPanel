import React from "react";

import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
const AstrologerLinkComponent = ({ onComponentChange, activeComponent }) => {
  const permissions = usePermissions();

  // Sabhi links aur unke permissions ki list
  const menuItems = [
    {
      component: "Overview",
      label: "Overview",
      permission: "view_astrologer_profile_overview",
    },
    {
      component: "AstrologerInfo",
      label: "Update Info",
      permission: "update_astrologer_profile_info",
    },
    {
      component: "ConsultantDeviceInfo",
      label: "Consultant Device Info",
      permission: "update_astrologer_profile_info",
    },
    {
      component: "Profile-Progress",
      label: "Onboarding Progress",
      permission: "view_astrologer_profile_onboarding_progress",
    },
    {
      component: "Gallery",
      label: "Gallery",
      permission: "view_astrologer_profile_gallery",
    },
    {
      component: "AstrologerOrder",
      label: "Orders",
      permission: "view_astrologer_profile_orders",
    },
    {
      component: "OfflineOrder",
      label: "Offline Order",
      permission: "view_coach_profile_orders",
    },
    {
      component: "AstrologerGifts",
      label: "Gifts",
      permission: "view_astrologer_profile_gift",
    },
    {
      component: "session-slot",
      label: "Appointment Session",
      permission: "view_astrologer_profile_appointment_session",
    },
    {
      component: "live-stream",
      label: "Live Stream",
      permission: "view_astrologer_profile_livestream",
    },
    {
      component: "AstrologerFollowers",
      label: "Followers",
      permission: "view_astrologer_profile_followers",
    },
    {
      component: "AstroReviewsListingTable",
      label: "Reviews",
      permission: "view_astrologer_profile_reviews",
    },
    {
      component: "account",
      label: "Bank Details",
      permission: "view_astrologer_profile_bank_details",
    },
    {
      component: "Price-chart",
      label: "Price Chart",
      permission: "view_astrologer_profile_price_chart",
    },
    {
      component: "Wallet",
      label: "Wallet",
      permission: "view_astrologer_profile_wallet",
    },
    {
      component: "consultant-commission",
      label: "Flute Commission",
      permission: "view_astrologer_profile_flute_commission",
    },
    {
      component: "CoachStatus",
      label: "Service Status",
      permission: "view_astrologer_profile_service_status",
    },
  ];

  return (
    <>
      <div className="vertical-nav">
        {menuItems.map((item) => {
          // Check if user has permission for this item
          const hasPermission = permissions?.astrologer?.includes(
            item.permission
          );

          // Agar permission nahi hai toh skip karo
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
    </>
  );
};

export default AstrologerLinkComponent;
