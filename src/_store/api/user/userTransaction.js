import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const userTransactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ********************** get user transaction list *********************************

    getUserTransactionsList: builder.query({
      query: ({
        userId,
        page,
        limit,
        start_date,
        end_date,
        ALLOWED_ACTIVITY_TYPES,
        type,
      }) => {
        const params = new URLSearchParams({
          page,
          limit,
        });

        if (ALLOWED_ACTIVITY_TYPES) {
          params.append("activity_type", ALLOWED_ACTIVITY_TYPES);
        }
        if (type) params.append("type", type);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return {
          url: `user/profile/user-transactions/${userId}?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["consultants", "transactions", "Subcsription"],
    }),

    // ********************** Add user wallet Balance *********************************
    createUserRecharge: builder.mutation({
      query: ({ body }) => ({
        url: `user/profile/admin/user-wallet-transactions`,
        method: "POST",
        headers: {
          // Authorization: getAdminToken(),
          Authorization: "Bearer admin_token",
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
