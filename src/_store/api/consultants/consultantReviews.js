import apiSlice from "../api";

export const consultantReviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsList: builder.query({
      query: (consultantId) => ({
        url: `coach-rating/admin/get_coach_rating_and_reviews/${consultantId}?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["reviews"],
    }),

    createReview: builder.mutation({
      query: ({ body }) => ({
        url: `coach-rating/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["reviews"],
    }),

    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/coach-rating/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["reviews"],
    }),

    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `coach-rating/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetReviewsListQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = consultantReviewApiSlice;
