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
    createDashboardOrderList: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/dashboard_order/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["dashboard"],
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

    updateDashboardOrderList: builder.mutation({
      query: ({ body, id }) => ({
        url: `/meta/dashboard_order/admin/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dashboard"],
    }),

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

    deleteDashboardOrder: builder.mutation({
      query: ({ id }) => ({
        // url: `/api/v1/consultant/profile/admin/notices/${id}`,
        url: `/meta/dashboard_order/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["dashboard"],
    }),

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
  useCreateDashboardOrderListMutation,
  useDeleteDashboardOrderMutation,
  useUpdateDashboardOrderListMutation,

  //   useGetConsultantAssignedNoticeListQuery,
  //   useGetConsultantListQuery,
  //   useCreateNoticeMutation,
  //   useCreateAssigneConsultantNoticeMutation,
  //   useUpdateNoticeMutation,
  //   useUpdateNoticestatusMutation,
  //   useDeleteNoticeMutation,
  //   useDeleteAssigneConsultantNoticeMutation,
} = dashboardOrderApiSlice;
