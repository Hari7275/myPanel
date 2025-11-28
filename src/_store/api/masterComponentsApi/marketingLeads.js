import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const marketingleadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarketingLeadsList: builder.query({
      query: ({ page, size, name, email, phone }) => {
        const params = new URLSearchParams({
          page: page,
          size: size,
        });

        if (name) params.append("name", name);
        if (email) params.append("email", email);
        if (phone) params.append("phone", phone);

        return {
          url: `/api/v1/consultant/profile/onboarding-assignee/admin/marketing-leads?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["adminlog", "consultant"],
    }),

    getMarketingLeadsLOnboardingAssignee: builder.query({
      query: () => {
        return {
          url: `/api/v1/consultant/profile/onboarding-assignee/admin/marketing-leads/summary`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["adminlog", "consultant"],
    }),

    uploadCsvLeadsFile: builder.mutation({
      query: (body) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/market-leads/import-csv`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["adminlog", "consultant"],
    }),

    // reassign

    assignLeadsToAdmin: builder.mutation({
      query: ({ body, lead_id }) => ({
        url: `/api/v1/consultant/profile/onboarding-assignee/admin/marketing-leads/${lead_id}`,
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
  useGetMarketingLeadsListQuery,
  useGetMarketingLeadsLOnboardingAssigneeQuery,
  useUploadCsvLeadsFileMutation,
  useAssignLeadsToAdminMutation,
} = marketingleadsApiSlice;
