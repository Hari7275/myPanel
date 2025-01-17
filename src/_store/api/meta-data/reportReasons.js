import apiSlice from "../api";

export const reportReasonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReportReasonList: builder.query({
      query: () => ({
        url: `/meta/report_reason/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createReportReason: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/report_reason/admin/add_reason`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updateReportReason: builder.mutation({
      query: ({ id, body }) => ({
        url: `meta/report_reason/admin/update_reason/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deleteReportReason: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/report_reason/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetReportReasonListQuery,
  useCreateReportReasonMutation,
  useUpdateReportReasonMutation,
  useDeleteReportReasonMutation,
} = reportReasonApiSlice;
