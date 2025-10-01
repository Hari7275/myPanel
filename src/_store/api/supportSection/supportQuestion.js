import apiSlice from "../api";

export const supportQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupportQuestionList: builder.query({
      query: () => ({
        url: `/api/v1/user/support/service/issues/admin/?page=1&size=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createSupportQuestion: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/user/support/service/issues/admin/`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updateSupportQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/support/service/issues/admin/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deleteSupportQuestion: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/user/support/service/issues/admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultant"],
    }),

    //  ************************* user support

    getUserSupportRequest: builder.query({
      query: ({ status, userId }) => ({
        url: `/api/v1/user/support/service/ticket/admin/?page=1&size=100&status=${status}&user_id=${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    // updateUserSupportRequest: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `/api/v1/user/support/service/ticket/${id}`,
    //     method: "PUT",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //     body,
    //   }),
    //   invalidatesTags: ["consultant"],
    // }),

    //

    updateUserSupportRequest: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/user/support/service/response/admin/`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetSupportQuestionListQuery,
  useCreateSupportQuestionMutation,
  useUpdateSupportQuestionMutation,
  useDeleteSupportQuestionMutation,
  useGetUserSupportRequestQuery,
  useUpdateUserSupportRequestMutation,
} = supportQuestionApiSlice;
