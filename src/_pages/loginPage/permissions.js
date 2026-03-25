export const ROUTE_PERMISSIONS = {
  dashboard: ["view_dashboard_superadmin", "view_dashboard_admin", "view_dashboard_onboarding_associate", "view_dashboard_developer", "view_dashboard_onboarding_manager", "view_dashboard_onboarding_executive"],
  user: ["view_user_list"],
  coaches: ["view_coach_list"],
  listeners: ["view_listener_list"],
  astrologer: ["view_astrologer_list"],
  "payment-transactions": ["view_payments"],
};

// Ordered list of routes to check for default landing page.
// The first route the user has permission for becomes their default page.
const DEFAULT_ROUTE_PRIORITY = [
  { path: "/dashboard", permissions: ["view_dashboard_superadmin", "view_dashboard_admin", "view_dashboard_onboarding_associate", "view_dashboard_developer", "view_dashboard_onboarding_manager", "view_dashboard_onboarding_executive"] },
  { path: "/order", permissions: ["view_order_list"] },
  { path: "/user", permissions: ["view_user_list"] },
  { path: "/listeners", permissions: ["view_listener_list"] },
  { path: "/coaches", permissions: ["view_coach_list"] },
  { path: "/astrologer", permissions: ["view_astrologer_list"] },
  { path: "/payment-transactions", permissions: ["view_payments"] },
  { path: "/user-recharge", permissions: ["view_recharge_list"] },
  { path: "/profile-review", permissions: ["view_profile_review"] },
];

export const getDefaultRoute = (permissions) => {
  if (!permissions || typeof permissions !== "object") return "/dashboard";

  // Flatten all permissions into a single array
  const allPermissions = Object.values(permissions).flat();

  // Wildcard means full access — go to dashboard
  if (allPermissions.includes("*")) return "/dashboard";

  // Return the first route the user has permission for
  for (const route of DEFAULT_ROUTE_PRIORITY) {
    if (route.permissions.some((perm) => allPermissions.includes(perm))) {
      return route.path;
    }
  }

  // Fallback if no matching permission found
  return "/dashboard";
};
