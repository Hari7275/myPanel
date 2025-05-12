import apiSlice from "../api";

export const datingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDatingList: builder.query({
      query: ({ page, size }) => ({
        url: `/api/v1/user/payment/date-product/admin?page=${page}&size=${size}`,
        // api/v1/user/payment/date-product/admin?page=1&size=2
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["dating"],
    }),

    createDating: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/user/payment/date-product/admin/`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dating"],
    }),

    updateDating: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/payment/date-product/admin/${id}`,

        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dating"],
    }),

    deleteDating: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/user/payment/date-product/admin/${id}`,
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
  useGetDatingListQuery,
  useCreateDatingMutation,
  useUpdateDatingMutation,
  useDeleteDatingMutation,
} = datingApiSlice;
