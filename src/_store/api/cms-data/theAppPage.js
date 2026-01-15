import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsTheAppPageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsTheAppPageList: builder.query({
      query: ({ page, pageSize, platformType, name }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        if (name) params.append("search", name);
        if (platformType) params.append("type", platformType);
        return {
          url: `/api/v1/content-management/admin/apps?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsTheAppPage: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/apps`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsTheAppPage: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/apps/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsTheAppPage: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/apps/${id}`,
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
  useGetCmsTheAppPageListQuery,
  useCreateCmsTheAppPageMutation,
  useUpdateCmsTheAppPageMutation,
  useDeleteCmsTheAppPageMutation,
} = cmsTheAppPageApiSlice;
