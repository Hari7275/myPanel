import apiSlice from "../api";

export const dashboardOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOrderList: builder.query({
      query: () => ({
        url: `/meta/dashboard_order/admin/get_all?page=1&size=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["dashboard"],
    }),

    // getConsultantList: builder.query({
    //   query: () => ({
    //     url: `/api/v1/consultant/profile/all-list`,
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   providesTags: ["notice"],
    // }),

    // getConsultantAssignedNoticeList: builder.query({
    //   query: ({ notice_id }) => ({
    //     url: `/api/v1/consultant/profile/admin/notices/assign-list/${notice_id}?page=1&size=1000`,
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   providesTags: ["notice"],
    // }),

    // createNotice: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/api/v1/consultant/profile/admin/notices`,
    //     method: "POST",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),

    // createAssigneConsultantNotice: builder.mutation({
    //   query: (body) => ({
    //     url: `/api/v1/consultant/profile/admin/notices/assign`,
    //     method: "POST",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),

    // updateNotice: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/api/v1/consultant/profile/admin/update-notices`,
    //     method: "PUT",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),

    // updateNoticestatus: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `/api/v1/consultant/profile/admin/notices/status/${id}`,
    //     method: "PATCH",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),

    // deleteNotice: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/v1/consultant/profile/admin/notices/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),

    // deleteAssigneConsultantNotice: builder.mutation({
    //   query: (body) => ({
    //     url: `/api/v1/consultant/profile/admin/notices/assign/delete`,
    //     method: "DELETE",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["notice"],
    // }),
  }),
});

export const {
  useGetDashboardOrderListQuery,

  //   useGetConsultantAssignedNoticeListQuery,
  //   useGetConsultantListQuery,
  //   useCreateNoticeMutation,
  //   useCreateAssigneConsultantNoticeMutation,
  //   useUpdateNoticeMutation,
  //   useUpdateNoticestatusMutation,
  //   useDeleteNoticeMutation,
  //   useDeleteAssigneConsultantNoticeMutation,
} = dashboardOrderApiSlice;
