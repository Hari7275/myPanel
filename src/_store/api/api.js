import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (args, api, extraOptions) => {
  const state = api.getState();

  const prod = state.auth?.prod;

  // const baseUrl = prod
  //   ? "https://api.fluteconnect.com/"
  //   : "https://dev-api.fluteconnect.com/";
  const baseUrl = "https://dev-api.fluteconnect.com/";

  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, api, extraOptions);
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
