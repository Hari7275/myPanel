import apiSlice from "../api";

export const blacklistedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlacklistedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/users-blacklist/blocked/${userId}?page=1&limit=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["blacklisted"],
    }),

    deleteBlacklistedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer internal_token",
        },
      }),
      invalidatesTags: ["blacklisted"],
    }),

    //************************************************* */ get avoided user list ****************************************************

    getAvoidedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/get-avoided-users/${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["avoided"],
    }),

    deleteAvoidedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/delete-user-avoid-list/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer internal_token",
        },
      }),
      invalidatesTags: ["avoided"],
    }),

    // *************************************************** get reported user List ******************************************************

    getReportedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/users-blacklist/reported/${userId}?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["reported"],
    }),

    deleteReportedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer internal_token",
        },
      }),
      invalidatesTags: ["reported"],
    }),

    // *************************************************** get hidden user List ******************************************************

    getHiddenUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/users-blacklist/hidden/${userId}?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["hidden"],
    }),

    deleteHiddenUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer internal_token",
        },
      }),
      invalidatesTags: ["hidden"],
    }),
  }),
});

export const {
  useGetBlacklistedUserListQuery,
  useDeleteBlacklistedUserMutation,

  useGetAvoidedUserListQuery,
  useDeleteAvoidedUserMutation,

  useGetReportedUserListQuery,
  useDeleteReportedUserMutation,

  useGetHiddenUserListQuery,
  useDeleteHiddenUserMutation,
} = blacklistedApiSlice;
