import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

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
      providesTags: ["user" || "user"],
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
        url: `user/profile/admin/update-user-info/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["user"],
    }),

    // update user dating info
    updateUserDatingInfo: builder.mutation({
      query: ({ body, id }) => ({
        url: `user/profile/update-basic-info/${id}?requestType=admin`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
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
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["user"],
    }),

    // *******************************************************this api is for notification****************************************

    getNotification: builder.query({
      query: ({ page, size, sender_id, notification_type_group }) => ({
        url: `notification/1?page=${page}&size=${size}&user_type=admin${
          sender_id ? `&sender_id=${sender_id}` : ""
        }${
          notification_type_group
            ? `&notification_type_group=${notification_type_group}`
            : ""
        }`,
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

    getNotificationGroup: builder.query({
      query: () => ({
        url: `notification/types/groups/`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserVerificationListQuery,
  useUpdateUserInfoMutation,
  useUpdateUserDatingInfoMutation,
  useUpdateUserInterstsTypeMutation,
  useGetNotificationQuery,
  useGetNotificationUnreadCountQuery,
  useUpdateNotificationReadCountMutation,
  useGetNotificationGroupQuery,
} = userApiSlice;
