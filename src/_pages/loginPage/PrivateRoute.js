import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredPermissions }) => {
  const authState = useSelector((state) => state?.auth);
  const { isAuthenticated, role } = authState;
  const rawPermissions = authState?.permissions;

  console.log("type of rawpermissions", typeof rawPermissions);
  const permissions = Array.isArray(rawPermissions) ? rawPermissions : [];
  console.log("type of permissions", typeof permissions);

  console.log("--- PRIVATE ROUTE DEBUG ---");
  console.log("Current auth state:", authState);
  console.log("Required permissions:", requiredPermissions);

  const hasPermission = () => {
    if (!requiredPermissions) {
      console.log("No permissions required - allowing access");
      return true;
    }

    if (
      permissions?.includes("*") ||
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,31,32,33,34,35,36,37,38,39,40
      ].includes(authState?.user?.id)
      // authState?.user?.id === 1 ||
      // authState?.user?.id === 4 ||
      // authState?.user?.id === 3
    ) {
      console.log("Wildcard permission found - allowing access");
      return true;
    }

    const hasPerm = requiredPermissions.some((perm) =>
      permissions?.includes(perm)
    );
    console.log("Permission check result:", hasPerm);
    console.log(
      "Missing permissions:",
      requiredPermissions?.filter((perm) => !permissions?.includes(perm))
    );

    return hasPerm;
  };

  if (!isAuthenticated) {
    console.log("Not authenticated - redirecting to login");
    return <Navigate to="/" replace />;
  }

  if (!hasPermission()) {
    console.log("Permission denied - redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("All checks passed - rendering component");
  return element;
};

export default PrivateRoute;
