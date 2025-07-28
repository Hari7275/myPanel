import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsBankDetails = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsBankDetails: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/profile/bank/admin/get-account-list/${consultantId}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultants"],
    }),

    getConsultantsPayPalDetails: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/profile/paypal/admin/get-account-list/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    updateBankDetailStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/bank/admin/update-status/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    updatePayPalDetailStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/paypal/admin/update-status/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetConsultantsBankDetailsQuery,
  useGetConsultantsPayPalDetailsQuery,
  useUpdateBankDetailStatusMutation,
  useUpdatePayPalDetailStatusMutation,
} = consultantsBankDetails;
