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

 
  }),
});

export const {
  useGetDashboardOrderListQuery,
  useCreateDashboardOrderListMutation,
  useDeleteDashboardOrderMutation,
  useUpdateDashboardOrderListMutation,

 
} = dashboardOrderApiSlice;
