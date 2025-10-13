import apiSlice from "../api";

export const graphApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRechargeGraphList: builder.query({
      query: ({ granularity, startDate, endDate }) => {
        const params = new URLSearchParams();

        if (granularity) params.append("filter", granularity);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);

        return {
          url: `/user/profile/admin/graph/recharge?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["graph"],
    }),
  }),
});

export const { useGetRechargeGraphListQuery } = graphApiSlice;
