import apiSlice from "../api";

export const consultantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsList: builder.query({
      query: ({ page = 1, size = 1000, id, name, phone, consultant_type }) => ({
        url: `/api/v1/consultant/profile/admin/consultant-list?&consultant_type=${consultant_type}&page=${page}&size=${size}&id=${id}&name=${name}&phone=${phone}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
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
          Authorization: "Bearer admin_token",
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
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetConsultantsListQuery,
  useUpdateStatusMutation,
  useGetConsultantsSettingsQuery,
  useGetConsultantsServiceStatusQuery,
  useUpdateDisplayStatusMutation,
} = consultantsApiSlice;
