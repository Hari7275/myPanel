import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsBlogCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsBlogCategoriesList: builder.query({
      query: () => ({
        url: `/api/v1/content-management/categories`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["banner"],
    }),

    createCmsBlogCategories: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/categories`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsBlogCategories: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/categories/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsBlogCategories: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/categories/${id}`,
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
  useGetCmsBlogCategoriesListQuery,
  useCreateCmsBlogCategoriesMutation,
  useUpdateCmsBlogCategoriesMutation,
  useDeleteCmsBlogCategoriesMutation,
} = cmsBlogCategoriesApiSlice;
