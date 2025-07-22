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
  }),
});

export const { useGetOrderListQuery, useGetBlogCountListQuery } = orderApiSlice;
