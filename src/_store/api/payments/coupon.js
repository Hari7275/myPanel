import apiSlice from "../api";

export const couponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCouponsList: builder.query({
      query: () => ({
        url: `api/v1/coupons/admin`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["coupons"],
    }),

    createCoupons: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/coupons`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["coupons"],
    }),

    updateCoupons: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/coupons/admin/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["coupons"],
    }),

    deleteCoupons: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/coupons/admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetCouponsListQuery,
  useCreateCouponsMutation,
  useUpdateCouponsMutation,
  useDeleteCouponsMutation,
} = couponsApiSlice;
