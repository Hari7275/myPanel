import apiSlice from "../api";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentList: builder.query({
      query: () => ({
        url: `api/v1/user/payment/all-payment-list`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    // createLanguage: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/meta/languages/add`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["payment"],
    // }),

    // updateLanguage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `meta/languages/update_language/${id}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["payment"],
    // }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["payment"],
    // }),
  }),
});

export const { useGetPaymentListQuery } = paymentApiSlice;
