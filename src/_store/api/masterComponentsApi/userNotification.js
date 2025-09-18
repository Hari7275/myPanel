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

    // createGift: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/api/v1/consultant/management/gift/admin/add`,
    //     method: "POST",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["gift"],
    // }),

    // updateGift: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `/api/v1/consultant/management/gift/admin/update/${id}`,
    //     method: "PUT",
    //     body,
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["gift"],
    // }),

    // deleteGift: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/v1/consultant/management/gift/admin/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["gift"],
    // }),
  }),
});

export const {
  useGetUserNotificationListQuery,
  useGetAllSendedUserNotificationListQuery,
  //   useCreateGiftMutation,
  //   useUpdateGiftMutation,
  //   useDeleteGiftMutation,
} = userNotificationApiSlice;
