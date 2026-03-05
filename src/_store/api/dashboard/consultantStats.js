import apiSlice from "../api";

export const consultantStats = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantStats: builder.query({
      query: () => ({
        url: `api/v1/consultant/auth/admin/consultant-stats`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),
  }),
});

export const { useGetConsultantStatsQuery } = consultantStats;
