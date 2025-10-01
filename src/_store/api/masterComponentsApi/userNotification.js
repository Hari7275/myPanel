import apiSlice from "../api";

export const userNotificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotificationList: builder.query({
      query: ({ page, size }) => ({
        url: `/notification/user-promotional/admin/list?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["Notification"],
    }),
    getAllSendedUserNotificationList: builder.query({
      query: ({ page, size, id }) => ({
        url: `/notification/user-promotional/admin/detail/${id}?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["Notification"],
    }),

    // api for notification template
    getUserNotificationTamplateList: builder.query({
      query: ({ page, size, id }) => ({
        url: `/notification/user-promotional/admin/template?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["Notification"],
    }),

    createNotificationTemplate: builder.mutation({
      query: ({ body }) => ({
        url: `/notification/user-promotional/admin/template/add`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    updateNotificationTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/notification/user-promotional/admin/template/edit/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteUserNotificationemplate: builder.mutation({
      query: ({ id }) => ({
        url: `/notification/user-promotional/admin/template/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["Notification"],
    }),

    // send notifications to users
    createSendNotificationToUser: builder.mutation({
      query: ({ body }) => ({
        url: `/notification/user-promotional/admin/send`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetUserNotificationListQuery,
  useGetAllSendedUserNotificationListQuery,
  useGetUserNotificationTamplateListQuery,
  useCreateNotificationTemplateMutation,
  useUpdateNotificationTemplateMutation,
  useDeleteUserNotificationemplateMutation,
  useCreateSendNotificationToUserMutation
  //   useCreateGiftMutation,
  //   useUpdateGiftMutation,
  //   useDeleteGiftMutation,
} = userNotificationApiSlice;
