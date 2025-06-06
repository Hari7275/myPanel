// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://dev-api.fluteconnect.com/",
//   }),
//   endpoints: (builder) => ({}),
// });

// export default apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (args, api, extraOptions) => {
  const state = api.getState();

  const prod = state.auth?.prod;
  const token = state.auth.token;

  console.log("token......", token);

  const baseUrl = prod
    ? "https://api.fluteconnect.com/"
    : "https://dev-api.fluteconnect.com/";

  console.log(`Using base URL: ${baseUrl} (prod mode: ${prod})`);

  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, api, extraOptions);
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
