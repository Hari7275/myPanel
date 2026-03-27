import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsDetails: builder.query({
      query: (id) => ({
        url: `api/v1/consultant/profile/admin/details/${id}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultants", "gallery"],
    }),

    updateConsultantsDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/consultant/profile/update/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    createConsultantOrderNotification: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/consultant/management/order/admin/observing-consultant`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    // getConsultantOrderNotification: builder.query({
    //   query: ({ consultant_id, user_id, status }) => ({
    //     url: `api/v1/consultant/management/order/admin/observing-consultant?consultant_id=${consultant_id}&user_id=${user_id}&status=${status}`,
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   providesTags: ["consultants", "gallery"],
    // }),

    getConsultantOrderNotification: builder.query({
      query: ({ consultant_id, user_id, status, page, limit }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (limit) params.append("size", limit);
        if (consultant_id) params.append("consultant_id", consultant_id);
        if (user_id) params.append("user_id", user_id);
        if (status) params.append("status", status);
        return {
          url: `/api/v1/consultant/management/order/admin/observing-consultant?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["consultants", "gallery"],
    }),

    updateConsultantOrderNotification: builder.mutation({
      query: ({ consultant_id, body }) => ({
        url: `api/v1/consultant/management/order/admin/observing-consultant/${consultant_id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    // User Observing List APIs
    getUserObservingList: builder.query({
      query: ({ user_id, observer_id, status, page, limit, name, phone_number }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (limit) params.append("size", limit);
        if (user_id) params.append("user_id", user_id);
        if (observer_id) params.append("observer_id", observer_id);
        if (name) params.append("name", name);
        if (phone_number) params.append("phone_number", phone_number);
        if (status !== null && status !== undefined) params.append("status", status);
        return {
          url: `/api/v1/consultant/management/order/admin/observing-user?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["userObserving"],
    }),

    addUserToObservingList: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/consultant/management/order/admin/observing-user`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["userObserving"],
    }),

    updateUserObservingStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/consultant/management/order/admin/observing-user/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["userObserving"],
    }),
  }),
});

export const {
  useGetConsultantsDetailsQuery,
  useUpdateConsultantsDetailsMutation,
  useCreateConsultantOrderNotificationMutation,
  useGetConsultantOrderNotificationQuery,
  useUpdateConsultantOrderNotificationMutation,
  useGetUserObservingListQuery,
  useAddUserToObservingListMutation,
  useUpdateUserObservingStatusMutation,
} = consultantsDetailsApiSlice;
