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
      query: ({ page, size }) => ({
        url: `meta/admin/get-blog-view?page=${page}&limit=${size}&start_date=2025-07-20&end_date=2025-07-22`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["blogCount"],
    }),
  }),
});

export const { useGetOrderListQuery, useGetBlogCountListQuery } = orderApiSlice;
