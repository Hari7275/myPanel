import apiSlice from "../api";

export const consultantReviewListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantReview: builder.query({
      query: ({ page = 1, size }) => ({
        url: `/api/v1/consultant/profile/profile-review-list?page=${page}&size=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["review"],
    }),

    getProfileReviewDetails: builder.query({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/profile-review-detail/${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["review"],
    }),

    updateProfileReviewDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/profile-detail-update/${id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetConsultantReviewQuery,
  useGetProfileReviewDetailsQuery,
  useUpdateProfileReviewDetailsMutation,
} = consultantReviewListApiSlice;
