import apiSlice from "../api";

export const giftsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGiftList: builder.query({
      query: ({ page, size }) => ({
        url: `/api/v1/consultant/management/gift/admin/gift-list?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["gift"],
    }),

    createGift: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/management/gift/admin/add`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["gift"],
    }),

    updateGift: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/management/gift/admin/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["gift"],
    }),

    deleteGift: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/consultant/management/gift/admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["gift"],
    }),
  }),
});

export const {
  useGetGiftListQuery,
  useCreateGiftMutation,
  useUpdateGiftMutation,
  useDeleteGiftMutation,
} = giftsApiSlice;
