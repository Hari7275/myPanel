import apiSlice from "../api";

export const userCollaboratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBankList: builder.query({
      query: (userId) => ({
        url: `api/v1/user/auth/payout/admin/user-bank-details/${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
        },
      }),
      providesTags: ["bankstatus"],
    }),
    updateUserAccountStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/auth/payout/admin/user-bank-status-update/${id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["bankstatus"],
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

export const { useGetUserBankListQuery,useUpdateUserAccountStatusMutation } = userCollaboratorApiSlice;
