import apiSlice from "../api";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionList: builder.query({
      query: () => ({
        url: `api/v1/user/payment/subscription/admin`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["subscription"],
    }),

    createSubscription: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/user/payment/subscription`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["subscription"],
    }),

    updateSubscription: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/user/payment/subscription/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/user/payment/subscription/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionListQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApiSlice;
