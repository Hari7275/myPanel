import apiSlice from "../api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: (userId) => ({
        url: `user/profile/user-profile-details?user_id=${userId}&type=complete&requestType=admin`,
        method: "GET",
        headers: {
          Authorization: "Bearer guest_token",
        },
      }),
      providesTags: ["user"],
    }),

    // *******************************************************this api is for user verfication photo****************************************

    getUserVerificationList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/get-all-photos/${userId}?page=1&size=1000`,

        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["user"],
    }),

    updateUserInfo: builder.mutation({
      query: ({ body, id }) => ({
        url: `user/profile/update-basic-info/${id}?requestType=admin`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["user"],
    }),

    // update user intersts type (passion  , prompt question  , feature )
    updateUserInterstsType: builder.mutation({
      query: (body) => ({
        url: `user/profile/update-user-interests?requestType=admin`,
        method: "PUT",
        body,
        // headers: {
        //   Authorization: "Bearer admin_token",
        // },
      }),
      invalidatesTags: ["user"],
    }),

    // *******************************************************this api is for notification****************************************

    getNotification: builder.query({
      query: () => ({
        url: `notification/1?page=1&size=10000&user_type=admin`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getNotificationUnreadCount: builder.query({
      query: () => ({
        url: `notification/unread-count/1?user_type=admin`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateNotificationReadCount: builder.mutation({
      query: ({ body, id }) => ({
        url: `notification/read/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserVerificationListQuery,
  useUpdateUserInfoMutation,
  useUpdateUserInterstsTypeMutation,
  useGetNotificationQuery,
  useGetNotificationUnreadCountQuery,
  useUpdateNotificationReadCountMutation,
} = userApiSlice;
