import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsPhotoGuidelinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsPhotoGuidelinesList: builder.query({
      query: ({ page, pageSize, platformType, name }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        if (name) params.append("search", name);
        if (platformType) params.append("type", platformType);
        return {
          url: `/api/v1/content-management/admin/photo-guidelines?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsPhotoGuidelines: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/photo-guidelines`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsPhotoGuidelines: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/photo-guidelines/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsPhotoGuidelines: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/photo-guidelines/${id}`,
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
  useGetCmsPhotoGuidelinesListQuery,
  useCreateCmsPhotoGuidelinesMutation,
  useUpdateCmsPhotoGuidelinesMutation,
  useDeleteCmsPhotoGuidelinesMutation,
} = cmsPhotoGuidelinesApiSlice;
