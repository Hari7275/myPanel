import apiSlice from "../api";

export const datingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDatingList: builder.query({
      query: () => ({
        url: `/api/v1/user/payment/date-product/admin`,
        method: "GET",
      }),
      providesTags: ["dating"],
    }),

    createDating: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/user/payment/date-product/admin/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["dating"],
    }),

    updateDating: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/payment/date-product/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["dating"],
    }),

    deleteDating: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/user/payment/date-product/${id}`,
        method: "DELETE",
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
