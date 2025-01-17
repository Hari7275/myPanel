import apiSlice from "../api";

export const metaConsultantStatus = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantStatus: builder.query({
      query: () => ({
        url: `/meta/consultant_status/get_all`,
        method: "GET",
      }),
      providesTags: ["consultant"],
    }),

    // createLanguage: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/meta/languages/add`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    // updateLanguage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `meta/languages/update_language/${id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["languages"],
    // }),
  }),
});

export const {
  useGetConsultantStatusQuery,
//   useCreateLanguageMutation,
//   useUpdateLanguageMutation,
//   useDeleteLanguageMutation,
} = metaConsultantStatus;
