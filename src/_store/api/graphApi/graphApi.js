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

        if (granularity) params.append("group_by", granularity);
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

    getUserRegisteredGraph: builder.query({
      query: ({ type, startDate, endDate }) => {
        const params = new URLSearchParams();

        if (type) params.append("type", type);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);

        return {
          url: `/api/v1/user/auth/admin/user-registered-graph?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["graph"],
    }),

    getTransactionGraph: builder.query({
      query: ({ type, startDate, endDate }) => {
        const params = new URLSearchParams();

        if (type) params.append("type", type);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);

        return {
          url: `/user/profile/admin/transaction-graph-data?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["graph"],
    }),

    getConsultantRegisteredGraph: builder.query({
      query: ({ type, startDate, endDate, consultant_type }) => {
        const params = new URLSearchParams();

        if (type) params.append("type", type);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        if (consultant_type) params.append("consultant_type", consultant_type);

        return {
          url: `/api/v1/consultant/auth/admin/consultant-registered-graph?${params.toString()}`,
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

export const {
  useGetRechargeGraphListQuery,
  useGetCouponGraphListQuery,
  useLazyGetUserRegisteredGraphQuery,
  useLazyGetTransactionGraphQuery,
  useLazyGetConsultantRegisteredGraphQuery,
} = graphApiSlice;
