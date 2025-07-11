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

    // ye api ssare consultant get karne ke liye hai jo ki dashboard order mein lag rhae hai   useGetConsultantListQuery

    getConsultantListDashboardOrder: builder.query({
      query: ({ type }) => ({
        url: `/api/v1/consultant/profile/all-list?type=0`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["notice"],
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
  useGetConsultantListDashboardOrderQuery,
  useCreateDashboardOrderListMutation,
  useDeleteDashboardOrderMutation,
  useUpdateDashboardOrderListMutation,
} = dashboardOrderApiSlice;
