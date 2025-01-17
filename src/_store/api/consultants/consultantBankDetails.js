import apiSlice from "../api";

export const consultantsBankDetails = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsBankDetails: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/profile/bank/admin/get-account-list/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // createLanguage: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/meta/languages/add`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    updateBankDetailStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/bank/admin/update-status/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["languages"],
    // }),
  }),
});

export const {
  useGetConsultantsBankDetailsQuery,
  useUpdateBankDetailStatusMutation,
} = consultantsBankDetails;
