import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const actionLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminActionLogList: builder.query({
      query: ({ page, size, start_date, end_date, title }) => {
        const params = new URLSearchParams({
          page: page,

          size: size,
        });

        // if (title) params.append("title", title);
        // if (start_date) params.append("start_date", start_date);
        // if (end_date) params.append("end_date", end_date);

        return {
          url: `api/v1/admin-service/admin/admin-logs/get-logs?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["adminlog", "consultant"],
    }),

    getOnboardingAssignedConsultantList: builder.query({
      query: ({ page = 1, size = 1000, id, name, phone, admin_id }) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/assigned-consultants?&admin_id=${admin_id}&page=${page}&size=${size}&id=${id}&name=${name}&phone=${phone}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["adminlog", "consultant"],
    }),

    //unregistered consultant assign list
    getOnboardingAssignedUnregisteredConsultantList: builder.query({
      query: ({ page = 1, size = 1000, id, name, phone, admin_id }) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/uncreated/assignee?&admin_id=${admin_id}&page=${page}&size=${size}&id=${id}&name=${name}&phone=${phone}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["adminlog", "consultant"],
    }),

    getAdminOnboardingSpecialistList: builder.query({
      query: ({ page, size, start_date, end_date, title }) => {
        return {
          url: `api/v1/consultant/profile/onboarding-assignee/admin/consultant-summary`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["adminlog", "consultant"],
    }),

    assignOnboardingToAdmin: builder.mutation({
      query: (body) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/assign`,
        method: "POST",
        headers: {
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["adminlog", "consultant"],
    }),

    // reassign

    reAssignOnboardingToAdmin: builder.mutation({
      query: (body) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/reassign`,
        method: "PUT",
        headers: {
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["adminlog", "consultant"],
    }),

    // get assigned leads to admin

    getAdminAssigneedLeadsList: builder.query({
      query: ({ page = 1, size , email, name, phone, admin_id }) => {
        return {
          url: `/api/v1/consultant/profile/onboarding-assignee/admin/marketing-leads/my-leads/${admin_id}&page=${page}&size=${size}&email=${email}&name=${name}&phone=${phone}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["adminlog", "consultant"],
    }),

    // update marketing leads status

    updateMarketingLeadsStatus: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/marketing-leads/${id}/status`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["adminlog", "consultant"],
    }),
  }),
});

export const {
  useGetAdminActionLogListQuery,
  useGetAdminOnboardingSpecialistListQuery,
  useGetOnboardingAssignedConsultantListQuery,
  useAssignOnboardingToAdminMutation,
  useReAssignOnboardingToAdminMutation,
  //   useUpdateAgoraCredentialsToJoinCallMutation,
  useGetOnboardingAssignedUnregisteredConsultantListQuery,

  useGetAdminAssigneedLeadsListQuery,
  useUpdateMarketingLeadsStatusMutation,
} = actionLogApiSlice;
