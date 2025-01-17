import apiSlice from "../api";

export const promotionalCardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionalCardList: builder.query({
      query: () => ({
        url: `meta/promotional_cards/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createPromotionalCard: builder.mutation({
      query: (formData) => ({
        url: `/meta/promotional_cards/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body: formData,
      }),
      invalidatesTags: ["consultant"],
    }),
    updatePromotionalCard: builder.mutation({
      query: ({ id, body }) => ({
        url: `meta/promotional_cards/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deletePromotionalCard: builder.mutation({
      query: ({ id }) => ({
        url: `meta/promotional_cards/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetPromotionalCardListQuery,
  useCreatePromotionalCardMutation,
  useUpdatePromotionalCardMutation,
  useDeletePromotionalCardMutation,
} = promotionalCardApiSlice;
