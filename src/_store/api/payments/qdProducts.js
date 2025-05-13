import apiSlice from "../api";

export const qdApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQdProductList: builder.query({
      query: ({ page, size }) => ({
        url: `/api/v1/user/payment/qd/admin?page=${page}&size=${size}`,

        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["dating"],
    }),

    createQdProducts: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/user/payment/qd/admin/`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dating"],
    }),

    updateQdProducts: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/payment/qd/admin/${id}`,

        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dating"],
    }),

    deleteQdProducts: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/user/payment/qd/admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dating"],
    }),
  }),
});

export const {
  useGetQdProductListQuery,
  useCreateQdProductsMutation,
  useUpdateQdProductsMutation,
  useDeleteQdProductsMutation,
} = qdApiSlice;
