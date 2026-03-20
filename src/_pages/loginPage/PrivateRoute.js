import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredPermissions }) => {
  const authState = useSelector((state) => state?.auth);
  const { isAuthenticated } = authState;
  const rawPermissions = authState?.permissions;

  // Flatten permissions object into a single array of permission names
  const permissions = rawPermissions && typeof rawPermissions === "object" && !Array.isArray(rawPermissions)
    ? Object.values(rawPermissions).flat()
    : Array.isArray(rawPermissions) ? rawPermissions : [];

  const hasPermission = () => {
    if (!requiredPermissions) {
      return true;
    }

    if (permissions?.includes("*")) {
      return true;
    }

    return requiredPermissions.some((perm) => permissions?.includes(perm));
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!hasPermission()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default PrivateRoute;
