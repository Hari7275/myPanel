import apiSlice from "../api";

export const graphApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRechargeGraphList: builder.query({
      query: ({ granularity, startDate, endDate, platform }) => {
        const params = new URLSearchParams();

        if (granularity) params.append("filter", granularity);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        if (platform) params.append("transaction_by", platform);

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


    getCouponGraphList: builder.query({
      query: ({ granularity, startDate, endDate, platform }) => {
        const params = new URLSearchParams();

        if (granularity) params.append("filter", granularity);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        if (platform) params.append("transaction_by", platform);

        return {
          url: `/user/profile/admin/graph/coupon?${params.toString()}`,
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

export const { useGetRechargeGraphListQuery,useGetCouponGraphListQuery } = graphApiSlice;
