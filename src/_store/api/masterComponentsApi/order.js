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
  }),
});

export const { useGetOrderListQuery } = orderApiSlice;
