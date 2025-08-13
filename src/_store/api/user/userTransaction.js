import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const userTransactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ********************** get user transaction list *********************************
    getUserTransactionsList: builder.query({
      query: ({ userId, page, limit }) => ({
        url: `user/profile/user-transactions/${userId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),

    // ********************** Add user wallet Balance *********************************
    createUserRecharge: builder.mutation({
      query: ({ body }) => ({
        url: `user/profile/admin/user-wallet-transactions`,
        method: "POST",
        headers: {
          Authorization: getAdminToken(),
          // Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["transactions"],
    }),

    // ********************** get user transaction list *********************************

    getUserSubscriptionList: builder.query({
      query: (userId) => ({
        url: `api/v1/user/payment/user-subscription/${userId}`,
        // url: `user/profile/subscription/${userId}`,
        method: "GET",
      }),
      providesTags: ["Subcsription"],
    }),
  }),
});

export const {
  useGetUserTransactionsListQuery,
  useCreateUserRechargeMutation,
  useGetUserSubscriptionListQuery,
} = userTransactionsApiSlice;
