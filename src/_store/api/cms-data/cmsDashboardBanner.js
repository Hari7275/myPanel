import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsDashboardBannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsDashboardBannerList: builder.query({
      query: () => ({
        url: `/meta/dashboard-web-banner/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["banner"],
    }),

    createCmsDashboardBanner: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/dashboard-web-banner/admin/add`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsDashboardBanner: builder.mutation({
      query: ({ body, id }) => ({
        url: `/meta/dashboard-web-banner/admin/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsDashboardBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/dashboard-web-banner/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
          //   Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetCmsDashboardBannerListQuery,
  useCreateCmsDashboardBannerMutation,
  useUpdateCmsDashboardBannerMutation,
  useDeleteCmsDashboardBannerMutation,
} = cmsDashboardBannerApiSlice;
