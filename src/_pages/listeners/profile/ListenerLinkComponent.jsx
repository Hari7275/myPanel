import React from "react";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const ListenerLinkComponent = ({ onComponentChange, activeComponent }) => {
  const permissions = usePermissions();
  // Mapping of components to their respective permissions
  const menuItems = [
    {
      component: "ListenerOverview",
      label: "Overview",
      permission: "view_listener_profile_overview",
    },
    {
      component: "ListenerInfo",
      label: "Update Info",
      permission: "view_listener_profile_info",
    },
    {
      component: "ConsultantDeviceInfo",
      label: "Consultant Device Info",
      permission: "view_listener_profile_info",
    },
    {
      component: "Profile-Progress",
      label: "Onboarding Progress",
      permission: "view_listener_profile_onboarding_progress",
    },
    {
      component: "Gallery",
      label: "Gallery",
      permission: "view_listener_profile_gallery",
    },
    {
      component: "ListenerOrder",
      label: "Orders",
      permission: "view_listener_profile_orders",
    },
    {
      component: "CoachGifts",
      label: "Gifts",
      permission: "view_listener_profile_orders",
    },
    {
      component: "OfflineOrder",
      label: "Offline Order",
      permission: "view_listener_profile_orders",
    },
    {
      component: "ListenerFollowers",
      label: "Favourite",
      permission: "view_listener_profile_favorites",
    },
    {
      component: "ListenerReviewsListingTable",
      label: "Reviews",
      permission: "view_listener_profile_reviews",
    },
    {
      component: "ListenerAccount",
      label: "Bank Details",
      permission: "view_listener_profile_bank_details",
    },
    {
      component: "Price-chart",
      label: "Price Chart",
      permission: "view_listener_profile_price_chart",
    },
    {
      component: "Wallet",
      label: "Wallet",
      permission: "view_listener_profile_wallet",
    },
    {
      component: "consultant-commission",
      label: "Flute Commission",
      permission: "view_listener_profile_flute_commission",
    },
    {
      component: "CoachStatus",
      label: "Service Status",
      permission: "view_listener_profile_service_status",
    },
    {
      component: "ConsultantBlockedUser",
      label: "Blocked User",
      permission: "view_listener_profile_service_status",
    },
  ];

  return (
    <>
      <header className="vertical-nav">
        {menuItems.map((item) => {
          // Check if user has permission for this item
          const hasPermission = permissions?.listener?.includes(
            item.permission
          );

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

export default ListenerLinkComponent;
