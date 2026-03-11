import apiSlice from "../api";

export const cmsListenerBannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsListenerBannerList: builder.query({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("size", pageSize);
        return {
          url: `/api/v1/cms/admin/listener-banners?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["listenerBanner"],
    }),

    createCmsListenerBanner: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/cms/admin/listener-banners`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["listenerBanner"],
    }),

    updateCmsListenerBanner: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/cms/admin/listener-banners/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["listenerBanner"],
    }),

    deleteCmsListenerBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/cms/admin/listener-banners/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["listenerBanner"],
    }),
  }),
});

export const {
  useGetCmsListenerBannerListQuery,
  useCreateCmsListenerBannerMutation,
  useUpdateCmsListenerBannerMutation,
  useDeleteCmsListenerBannerMutation,
} = cmsListenerBannerApiSlice;
