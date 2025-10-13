import apiSlice from "../api";

export const graphApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRechargeGraphList: builder.query({
      query: ({ granularity }) => ({
        url: `/user/profile/admin/graph/recharge${
          granularity ? `?filter=${granularity}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["graph"],
    }),
  }),
});

export const { useGetRechargeGraphListQuery } = graphApiSlice;
