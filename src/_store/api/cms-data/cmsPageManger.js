import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsPageManagerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsPageManagerList: builder.query({
      query: ({ page, pageSize, platformType, name }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        if (name) params.append("search", name);
        if (platformType) params.append("type", platformType);
        return {
          url: `/api/v1/content-management/admin/pages?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsPageManager: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/pages`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsPageManager: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/pages/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsPageManager: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/pages/${id}`,
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
  useGetCmsPageManagerListQuery,
  useCreateCmsPageManagerMutation,
  useUpdateCmsPageManagerMutation,
  useDeleteCmsPageManagerMutation,
} = cmsPageManagerApiSlice;
