import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev-api.fluteconnect.com/",
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
