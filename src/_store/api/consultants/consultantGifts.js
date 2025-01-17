import apiSlice from "../api";

export const consultantsGiftsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsGift: builder.query({
      query: () => ({
        url: `/api/v1/consultant/profile/follower/`,
        method: "GET",
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

    // updateLanguage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `meta/languages/update_language/${id}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["languages"],
    // }),
  }),
});

export const { useGetConsultantsGiftQuery } = consultantsGiftsApiSlice;
