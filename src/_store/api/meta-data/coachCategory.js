import apiSlice from "../api";

export const coachCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachCategoryList: builder.query({
      query: () => ({
        url: `/meta/coach_categories/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    createCoachCategory: builder.mutation({
      query: (formData) => ({
        url: `/meta/coach_categories/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body: formData,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateCoachCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/coach_categories/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    deleteCoachCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/coach_categories/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetCoachCategoryListQuery,
  useCreateCoachCategoryMutation,
  useUpdateCoachCategoryMutation,
  useDeleteCoachCategoryMutation,
} = coachCategoryApiSlice;
