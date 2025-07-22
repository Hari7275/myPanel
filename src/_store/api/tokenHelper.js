// import store from "../../_store/index";

import { store } from "../index";

export const getAdminToken = () => {
  const token = store.getState().auth.token;

  return token ? `Bearer ${token}` : "Bearer admin_token";
};

// export const hasPermission = (key) => {
//   const permissions = store.getState().auth?.permissions || {};

//   console.log("permissions/////", permissions);
//   return Object.prototype.hasOwnProperty.call(permissions, key);
// };
