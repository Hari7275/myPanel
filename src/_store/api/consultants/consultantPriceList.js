import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsPriceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsPrice: builder.query({
      query: (consultantId) => ({
        url: `api/v1/consultant/profile/consultant-price-list/admin/price-list/${consultantId}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultants"],
    }),

    getConsultantsNewPrice: builder.query({
      query: (consultantId) => ({
        url: `api/v1/consultant/payment/price-list/admin/consultant-display-price-list/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // **************************************** get consultant price change  ****************************************

    getConsultantsPriceForChange: builder.query({
      query: (consultantId) => ({
        url: `api/v1/consultant/payment/price-list/admin/get-service-price-list/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    updateConsultantPriceStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `/api/v1/consultant/profile/consultant-price-list/admin/update-status/${status}/${id}`,
        method: "PUT",

        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["consultants"],
    }),

    // **************************************** update consultant price  ****************************************

    updateConsultantPriceChart: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/consultant-price-list/admin/update-price/${id}`,
        method: "PUT",
        body,
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["consultants"],
    }),

    // **************************************** update consultant new  price  ****************************************

    updateConsultantNewPriceChart: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/payment/price-list/admin/update-price/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultants"],
    }),

    getConsultantsWallet: builder.query({
      query: ({ consultantId, page, limit }) => ({
        url: `/api/v1/consultant/payment/admin/${consultantId}?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // *********************************** Appointment session slot  **********************************

    getSessionSlot: builder.query({
      query: ({ consultantId, page, size }) => ({
        // url: `api/v1/consultant/profile/appointment/admin/${consultantId}?page=1&size=3`,
        url: `api/v1/consultant/profile/appointment/admin/${consultantId}?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),
    // ***********************************Update  Consultant new Price request   **********************************

    updateConsultantNewPriceChangeRequest: builder.mutation({
      query: ({ status, id, body }) => ({
        url: `/api/v1/consultant/payment/price-list/admin/update-status/${status}/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultants"],
    }),

    // **************************************** end  ****************************************

    createConsultantWalletTrans: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/consultant/payment/admin/tran`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants", "transactions", "order"],
    }),
  }),
});

export const {
  useGetConsultantsPriceQuery,
  useGetConsultantsNewPriceQuery,
  useGetConsultantsPriceForChangeQuery,
  useUpdateConsultantPriceStatusMutation,
  useUpdateConsultantPriceChartMutation,
  useUpdateConsultantNewPriceChartMutation,
  useGetConsultantsWalletQuery,
  useGetSessionSlotQuery,
  useUpdateConsultantNewPriceChangeRequestMutation,
  useCreateConsultantWalletTransMutation,
} = consultantsPriceApiSlice;
