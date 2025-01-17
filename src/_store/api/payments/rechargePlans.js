import apiSlice from "../api";

export const rechargeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRechargeList: builder.query({
      query: () => ({
        url: `api/v1/user/payment/plan/list`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["recharge"],
    }),

    createRecharge: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/user/payment/plan/`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["recharge"],
    }),

    updateRecharge: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/user/payment/plan/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["recharge"],
    }),

    deleterRecharge: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/user/payment/plan/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["recharge"],
    }),
  }),
});

export const {
  useGetRechargeListQuery,
  useCreateRechargeMutation,
  useUpdateRechargeMutation,
  useDeleterRechargeMutation,
} = rechargeApiSlice;
