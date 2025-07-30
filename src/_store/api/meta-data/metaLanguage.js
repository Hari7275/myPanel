import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const metaLanguageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLanguagesList: builder.query({
      query: () => ({
        url: `/meta/languages/admin/get_all_languages`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["languages"],
    }),

    createLanguage: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/languages/admin/add`,
        method: "POST",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["languages"],
    }),

    updateLanguage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/languages/admin/update_language/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["languages"],
    }),

    deleteLanguage: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/languages/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["languages"],
    }),
  }),
});

export const {
  useGetLanguagesListQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = metaLanguageApiSlice;
