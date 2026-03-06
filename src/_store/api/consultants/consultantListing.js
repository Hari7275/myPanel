import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getConsultantsList: builder.query({
    //   query: ({
    //     page = 1,
    //     size = 1000,
    //     id,
    //     name,
    //     phone,
    //     consultant_type,
    //     auth_status,
    //     email,
    //   }) => ({
    //     url: `/api/v1/consultant/profile/admin/consultant-list?&consultant_type=${consultant_type}&page=${page}&size=${size}&id=${id}&name=${name}&phone=${phone}&auth_status=${auth_status}&email=${email}`,
    //     method: "GET",
    //     headers: {
    //       // Authorization: "Bearer admin_token",
    //       Authorization: getAdminToken(),
    //     },
    //   }),

    //   providesTags: ["consultants", "adminlog"],
    // }),

    getConsultantsList: builder.query({
      query: ({
        page = 1,
        size = 10,
        id,
        name,
        phone,
        consultant_type,
        auth_status,
        email,
      }) => {
        const params = new URLSearchParams();

        // required params
        params.append("page", page);
        params.append("size", size);

        // optional params
        if (id) params.append("id", id);
        if (name) params.append("name", name);
        if (phone) params.append("phone", phone);
        if (consultant_type) params.append("consultant_type", consultant_type);
        if (auth_status) params.append("auth_status", auth_status);
        if (email) params.append("email", email);

        return {
          url: `/api/v1/consultant/profile/admin/consultant-list?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: getAdminToken(),
          },
        };
      },

      providesTags: ["consultants", "adminlog"],
    }),

    // update consultant status

    updateStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/auth/update-status/${id}`,
        method: "PATCH",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
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

    // update consultant visibility status

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

    // update consultant service status

    updateConsultantServiceStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/service-status/admin/update-service-status/${id}`,
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

      providesTags: ["consultants", "adminlog"],
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

    // ye kisi particular  consultant ke device token ko get karne ke liye

    getParticularConsultantsDeviceToken: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/auth/admin/latest-device-info/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["consultants"],
    }),

    // ye kisi particular  user ke device token ko get karne ke liye

    getParticularUserDeviceToken: builder.query({
      query: (userId) => ({
        url: `/api/v1/user/auth/admin/latest-device-info/${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

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

    // No order consultants list
    getNoOrderConsultantsList: builder.query({
      query: ({ page = 1, size = 10, last_days = 7, consultant_type = "1,2,3", name }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("size", size);
        params.append("last_days", last_days);
        params.append("consultant_type", consultant_type);
        if (name) params.append("name", name);

        return {
          url: `/api/v1/consultant/profile/admin/no-order-consultants?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: getAdminToken(),
          },
        };
      },
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
  useGetConsultantsDeviceTokenListQuery,
  useUpdateConsultantServiceStatusMutation,
  useGetRegisterUserDeviceTokenListQuery,
  useGetParticularConsultantsDeviceTokenQuery,
  useGetUserDeviceTokenListQuery,
  useGetParticularUserDeviceTokenQuery,
  useGetNoOrderConsultantsListQuery,
} = consultantsApiSlice;
