import apiSlice from "../api";

export const blacklistedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlacklistedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/users-blacklist/blocked/${userId}?page=1&limit=100`,
        method: "GET",
      }),
      providesTags: ["blacklisted"],
    }),

    deleteBlacklistedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blacklisted"],
    }),

    //************************************************* */ get avoided user list ****************************************************

    getAvoidedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/get-avoided-users/${userId}`,
        method: "GET",
      }),
      providesTags: ["avoided"],
    }),

    deleteAvoidedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/delete-user-avoid-list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["avoided"],
    }),

    // *************************************************** get reported user List ******************************************************

    getReportedUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/users-blacklist/reported/${userId}?page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["reported"],
    }),

    deleteReportedUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reported"],
    }),

    // *************************************************** get hidden user List ******************************************************

    getHiddenUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/users-blacklist/hidden/${userId}?page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["hidden"],
    }),

    deleteHiddenUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/profile/users-removefrom-blacklist/${id}`,
        method: "DELETE",
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
