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
      query: ({
        page,
        size,
        consultantId,
        device_id,
        is_active,
        platform,
        start_date,
        end_date,
      }) => {
        const params = new URLSearchParams({
          page,
          size,
        });

        if (consultantId) params.append("consultant_id", consultantId);
        if (platform) params.append("platform", platform);
        if (is_active) params.append("is_active", is_active);
        if (device_id) params.append("device_id", device_id);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return {
          url: `/api/v1/consultant/auth/consultant-device/device-info/list?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["consultants"],
    }),

    // ye guest user ki api hai Device token ke liye

    getUserDeviceTokenList: builder.query({
      query: ({ page, size }) => ({
        url: `/api/v1/user/auth/admin/guest-user-tracking?&page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["consultants"],
    }),

    // ye register user ki api hai Device token ke liye

    getRegisterUserDeviceTokenList: builder.query({
      query: ({
        page,
        size,
        user_id,
        device_id,
        is_active,
        platform,
        start_date,
        end_date,
      }) => {
        const params = new URLSearchParams({
          page,
          size,
        });

        if (user_id) params.append("user_id", user_id);
        if (platform) params.append("platform", platform);
        if (is_active) params.append("is_active", is_active);
        if (device_id) params.append("device_id", device_id);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return {
          url: `/api/v1/user/auth/admin/device-info/list?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["consultants"],
    }),

    // getRegisterUserDeviceTokenList: builder.query({
    //   query: ({ page, size }) => ({
    //     url: `/api/v1/user/auth/admin/device-info/list?&page=${page}&size=${size}`,
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),

    //   providesTags: ["consultants"],
    // }),
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
  useGetConsultantsDeviceTokenListQuery,
  useGetUserDeviceTokenListQuery,
  useGetRegisterUserDeviceTokenListQuery,
} = consultantsApiSlice;
