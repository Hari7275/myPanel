import apiSlice from "../api";

export const payoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayoutList: builder.query({
      query: ({ status }) => ({
        url: `/api/v1/consultant/payment/payout/admin-requests/?page=1&limit=10000`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["payout"],
    }),

    updatePayout: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/payment/payout/admin`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["payout"],
    }),
  }),
});

export const { useGetPayoutListQuery, useUpdatePayoutMutation } =
  payoutApiSlice;
