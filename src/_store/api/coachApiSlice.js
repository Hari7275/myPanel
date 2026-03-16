import apiSlice from "./api";

export const coachApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachesList: builder.query({
      query: ({ page = 1, limit = 20 }) => ({
        url: `coach/profile/get-coach-listiner?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getCoachProfileData: builder.query({
      query: ({ id }) => ({
        url: `get-coach-listeners-view-details?id=${id}&r =admin`,
        method: "GET",
      }),
    }),

    createCoachAccount: builder.mutation({
      query: ({ body }) => ({
        url: `/api/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coach"],
    }),

    updateCoachProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),

    deleteCoachProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getPayoutHistory: builder.query({
      query: ({ consultant_id }) => ({
        url: `/api/v1/consultant/payment/payout/admin-requests?consultant_id=${consultant_id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
    }),
  }),
});

export const {
  useGetCoachesListQuery,
  useGetCoachProfileDataQuery,
  useCreateCoachAccountMutation,
  useGetPayoutHistoryQuery,
} = coachApiSlice;
