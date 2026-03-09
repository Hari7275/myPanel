import apiSlice from "../api";

export const refundListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRefundList: builder.query({
      query: ({ page, size }) => ({
        url: `/api/v1/consultant/management/order/admin/refund-list?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["refundList"],
    }),
  }),
});

export const { useGetRefundListQuery } = refundListApiSlice;
