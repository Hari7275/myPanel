import apiSlice from "../api";

export const consultantsPriceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsPrice: builder.query({
      query: (consultantId) => ({
        url: `api/v1/consultant/profile/consultant-price/admin/price-list/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    updateConsultantPriceStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `/api/v1/consultant/profile/consultant-price/admin/update-status/${status}/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultants"],
    }),

    getConsultantsWallet: builder.query({
      query: (consultantId) => ({
        url: `https://dev-api.fluteconnect.com/api/v1/consultant/payment/admin/${consultantId}?page=1&limit=100`,
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
  useGetConsultantsWalletQuery,
} = consultantsPriceApiSlice;
