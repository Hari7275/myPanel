import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const cmsBlogListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getCmsBlogList: builder.query({
    //   query: ({ page, pageSize }) => ({
    //     url: `/api/v2/content-management/blogs?page=${page}&limit=${pageSize}`,
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   providesTags: ["banner"],
    // }),

    getCmsBlogList: builder.query({
      query: ({ page, pageSize, blogSlug }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        if (blogSlug) params.append("search", blogSlug);
        return {
          url: `/api/v1/content-management/admin/blogs?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),

    createCmsBlogList: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/blog`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsBlogList: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/blogs/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsBlogList: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/authors/${id}`,
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
  useGetCmsBlogListQuery,
  useCreateCmsBlogListMutation,
  useUpdateCmsBlogListMutation,
  useDeleteCmsBlogListMutation,
} = cmsBlogListApiSlice;
