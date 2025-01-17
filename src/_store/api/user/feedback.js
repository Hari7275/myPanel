import apiSlice from "../api";

export const userFeedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserFeedbackList: builder.query({
      query: () => ({
        url: `user/profile/user-all-feedback?page=1&limit=1`,
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),


    // createUserInfo: builder.mutation({
    //   query: ({ body, id }) => ({
    //     url: `user/profile/update-basic-info/7`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["user"],
    // }),

    // updateLanguage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `meta/languages/update_language/${id}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["user"],
    // }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["user"],
    // }),
  }),
});

export const { useGetUserFeedbackListQuery } = userFeedbackApiSlice;
