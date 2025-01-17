import apiSlice from "../api";

export const dashboardBannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardBannerList: builder.query({
      query: () => ({
        url: `/meta/dashboard-banner/admin/get_all?page=1&limit=120`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["banner"],
    }),

    createDashboardBanner: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/dashboard-banner/admin/add`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateDashboardBanner: builder.mutation({
      query: ({ body, id }) => ({
        url: `/meta/dashboard-banner/admin/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateDisplayDashboardBanner: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/dashboard-banner/admin/update-display-order`,
        method: "PATCH",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteDashboardBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/dashboard-banner/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetDashboardBannerListQuery,
  useCreateDashboardBannerMutation,
  useUpdateDashboardBannerMutation,
  useUpdateDisplayDashboardBannerMutation,
  useDeleteDashboardBannerMutation,
} = dashboardBannerApiSlice;
