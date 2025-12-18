import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsFAQsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsFAQsList: builder.query({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        return {
          url: `/api/v1/content-management/faqs?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsFAQs: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/faqs`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsFAQs: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/faqs/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsFAQs: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/faqs/${id}`,
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
  useGetCmsFAQsListQuery,
  useCreateCmsFAQsMutation,
  useUpdateCmsFAQsMutation,
  useDeleteCmsFAQsMutation,
} = cmsFAQsApiSlice;
