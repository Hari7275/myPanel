import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsList: builder.query({
      query: ({
        page = 1,
        size = 1000,
        id,
        name,
        phone,
        consultant_type,
        auth_status,
      }) => ({
        url: `/api/v1/consultant/profile/admin/consultant-list?&consultant_type=${consultant_type}&page=${page}&size=${size}&id=${id}&name=${name}&phone=${phone}&auth_status=${auth_status}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),

      providesTags: ["consultants"],
    }),

    // update consultant status

    updateStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/auth/update-status/${id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    // Api for consultant settings

    getConsultantsSettings: builder.query({
      query: ({ consultantId }) => ({
        url: `/api/v1/consultant-settings/admin/get_all/35`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // ******************************** service status *******************************************

    getConsultantsServiceStatus: builder.query({
      query: ({ id }) => ({
        // url: `api/v1/consultant/profile/service-status/admin/${id}`,
        url: `api/v1/consultant/profile/service-status/admin/${id}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultants"],
    }),

    // update consultant status

    updateDisplayStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/service-status/admin/update-display-status/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
    // update consultant profile status in details section

    updateConsultantProfileStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/update-profile-status/${id}`,
        method: "PATCH",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    // ye uss consultant ki api hai jo unregistered hai

    getUnregisteredConsultantsList: builder.query({
      query: ({ page, size, email_address, phone_number, id }) => ({
        url: `/api/v1/consultant/auth/admin/uncreated-consultants?&page=${page}&size=${size}&phone_number=${phone_number}&email_address=${email_address}&id=${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["consultants"],
    }),

    // ye uss consultant ki api hai consultant ke device token ko get karne ke liye

    getConsultantsDeviceTokenList: builder.query({
      query: ({ page, size, email_address, phone_number, id }) => ({
        // url: `/api/v1/consultant/auth/admin/uncreated-consultants?&page=${page}&size=${size}&phone_number=${phone_number}&email_address=${email_address}&id=${id}`,
        url: `/api/v1/consultant/auth/consultant-device/device-info/list?page=1&consultant_id=306&device_id=lahaina&platform=2&start_date=2025-09-05&end_date=2025-09-05&size=20`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetConsultantsListQuery,
  useUpdateStatusMutation,
  useGetConsultantsSettingsQuery,
  useGetConsultantsServiceStatusQuery,
  useUpdateDisplayStatusMutation,
  useUpdateConsultantProfileStatusMutation,
  useGetUnregisteredConsultantsListQuery,
  useGetConsultantsDeviceTokenListQuery
} = consultantsApiSlice;
