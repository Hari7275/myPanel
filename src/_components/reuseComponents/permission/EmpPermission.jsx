// import React from "react";
// import { useSelector, useDispatch } from "react-redux";

// const EmpPermission = () => {
//   const permissions = useSelector((state) => state.auth?.permissions || {});

//   console.log("overall permissions", permissions);
//   return <div>EmpPermission</div>;
// };

// export default EmpPermission;




// _hooks/usePermissions.js
import { useSelector } from "react-redux";

const usePermissions = () => {
  const permissions = useSelector((state) => state.auth?.permissions || {});
  return permissions;
};

export default usePermissions;
