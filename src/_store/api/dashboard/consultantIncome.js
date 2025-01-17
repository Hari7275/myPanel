import apiSlice from "../api";

export const consultantsIncome = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFluteIncome: builder.query({
      query: () => ({
        url: `user/profile/admin/dashboard-Details`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getFluteIncomeByConsultants: builder.query({
      query: () => ({
        url: `api/v1/consultant/management/order/flute-consultants-income`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getFluteIncomeByUsers: builder.query({
      query: () => ({
        url: `user/qd/flute-income-from-qd`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getFluteRefundToUser: builder.query({
      query: () => ({
        url: `user/qd/flute-refund-to-user`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getConsultantIncome: builder.query({
      query: () => ({
        url: `/api/v1/consultant/payment/admin/total-consultants-income`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getConsultantPayoutAmount: builder.query({
      query: () => ({
        url: `/api/v1/consultant/payment/payout/admin/total-consultants-payout`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    getFluteRefferalAmount: builder.query({
      query: () => ({
        url: `user/profile/admin/flute-dicount-details`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetFluteIncomeQuery,
  useGetFluteIncomeByConsultantsQuery,
  useGetFluteIncomeByUsersQuery,
  useGetFluteRefundToUserQuery,
  useGetConsultantIncomeQuery,
  useGetConsultantPayoutAmountQuery,
  useGetFluteRefferalAmountQuery
} = consultantsIncome;
