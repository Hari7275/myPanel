import apiSlice from "../api";

export const consultantCommissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommissionList: builder.query({
      query: (consultantId) => ({
        url: `api/v1/consultant/profile/consultant-price-list/admin/consultant-commission/1518?page=1&limit=10`,
        // url: `api/v1/consultant/profile/consultant-price-list/admin/consultant-commission/${consultantId}?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["commission"],
    }),

    createCommission: builder.mutation({
      query: ({ body }) => ({
        url: `coach-rating/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["commission"],
    }),

    updateCommission: builder.mutation({
      query: ({ id, body }) => ({
        url: `/coach-rating/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["commission"],
    }),

    deleteCommission: builder.mutation({
      query: ({ id }) => ({
        url: `coach-rating/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["commission"],
    }),
  }),
});

export const {
  useGetCommissionListQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
} = consultantCommissionApiSlice;
