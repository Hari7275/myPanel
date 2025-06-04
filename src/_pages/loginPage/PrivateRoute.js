import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, requiredPermissions }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, permissions = [], role } = authState;

  console.log("--- PRIVATE ROUTE DEBUG ---");
  console.log("Current auth state:", authState);
  console.log("Required permissions:", requiredPermissions);

  const hasPermission = () => {
    if (!requiredPermissions) {
      console.log("No permissions required - allowing access");
      return true;
    }

    if (permissions.includes("*")) {
      console.log("Wildcard permission found - allowing access");
      return true;
    }

    const hasPerm = requiredPermissions.some((perm) =>
      permissions.includes(perm)
    );
    console.log("Permission check result:", hasPerm);
    console.log(
      "Missing permissions:",
      requiredPermissions.filter((perm) => !permissions.includes(perm))
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
