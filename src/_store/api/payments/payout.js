import apiSlice from "../api";

export const payoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayoutList: builder.query({
      query: ({ page, size, status }) => ({
        url: `/api/v1/consultant/payment/payout/admin-requests/?page=${page}&limit=${size}${
          status ? `&status=${status}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["payout"],
    }),

    updatePayout: builder.mutation({
      query: ({ body }) => ({
        // url: `/api/v1/consultant/payment/payout/admin`,
        url: `/api/v1/consultant/payment/payout/admin`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["payout"],
    }),

    getPayableList: builder.query({
      query: ({ page, size, consultant_id, start_date, end_date }) => ({
        url: `/api/v1/consultant/payment/admin/monthly-transactions?page=${page}&size=${size}&consultant_id=${consultant_id}&start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["payout"],
    }),
  }),
});

export const {
  useGetPayoutListQuery,
  useUpdatePayoutMutation,
  useGetPayableListQuery,
} = payoutApiSlice;
