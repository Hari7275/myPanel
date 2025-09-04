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
  }),
});

export const {
  useGetConsultantsPriceQuery,
  useUpdateConsultantPriceStatusMutation,
  useUpdateConsultantPriceChartMutation,
  useGetConsultantsWalletQuery,
  useGetSessionSlotQuery,
} = consultantsPriceApiSlice;
