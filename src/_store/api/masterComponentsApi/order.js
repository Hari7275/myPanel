import apiSlice from "../api";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query({
      query: ({ page, size }) => ({
        url: `api/v1/consultant/management/order/admin/all-orders?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["order"],
    }),

    getBlogCountList: builder.query({
      query: ({ page, size, start_date, end_date }) => ({
        url: `meta/admin/get-blog-view?page=${page}&limit=${size}&start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["blogCount"],
    }),

    // user All recharge List
    getUserRechargeList: builder.query({
      query: ({ page, size, start_date, end_date }) => ({
        url: `user/profile/admin/all-recharge-list?page=${page}&limit=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["blogCount"],
    }),
    // user All Subscription List
    getUserAllSubscriptionList: builder.query({
      query: ({ page, size, start_date, end_date }) => ({
        // user/profile/admin/all-subscriptions?page=1&limit=10
        url: `user/profile/admin/all-subscriptions?page=${page}&limit=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["blogCount"],
    }),

    // get particular subscription details
    // user All Subscription List
    getSingleSubscriptionDetails: builder.query({
      query: ({ id }) => ({
        // user/profile/admin/all-subscriptions?page=1&limit=10
        url: `api/v1/user/payment/subscription/${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer internal_token",
        },
      }),
      providesTags: ["blogCount"],
    }),
  }),
});

export const {
  useGetOrderListQuery,
  useGetBlogCountListQuery,
  useGetUserRechargeListQuery,
  useGetUserAllSubscriptionListQuery,
  useGetSingleSubscriptionDetailsQuery,
} = orderApiSlice;
