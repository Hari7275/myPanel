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

    getConsultantOrderNotification: builder.query({
      query: ({ consultant_id, user_id, status }) => ({
        url: `api/v1/consultant/management/order/admin/observing-consultant?consultant_id=${consultant_id}&user_id=${user_id}&status=${status}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants", "gallery"],
    }),

    updateConsultantOrderNotification: builder.mutation({
      query: ({ consultant_id, body }) => ({
        url: `api/v1/consultant/management/order/observing-consultant/${consultant_id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetConsultantsDetailsQuery,
  useUpdateConsultantsDetailsMutation,
  useCreateConsultantOrderNotificationMutation,
  useGetConsultantOrderNotificationQuery,
  useUpdateConsultantOrderNotificationMutation,
} = consultantsDetailsApiSlice;
