import apiSlice from "../api";


export const cmsBlogAuthorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   

    getCmsBlogAuthorList: builder.query({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        return {
          url: `/api/v1/content-management/authors?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsBlogAuthor: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/authors`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsBlogAuthor: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/authors/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsBlogAuthor: builder.mutation({
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
  useGetCmsBlogAuthorListQuery,
  useCreateCmsBlogAuthorMutation,
  useUpdateCmsBlogAuthorMutation,
  useDeleteCmsBlogAuthorMutation,
} = cmsBlogAuthorApiSlice;
