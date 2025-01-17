import apiSlice from "../api";

export const featuresApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturesList: builder.query({
      query: () => ({
        url: `api/v1/user/payment/feature/admin`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["features"],
    }),

    createFeatures: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/user/payment/feature/admin`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["features"],
    }),

    updateFeatures: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/user/payment/feature/admin/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["features"],
    }),

    deleteFeatures: builder.mutation({
      query: ({ id }) => ({
        url: `api/v1/user/payment/feature/admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["features"],
    }),
  }),
});

export const {
  useGetFeaturesListQuery,
  useCreateFeaturesMutation,
  useUpdateFeaturesMutation,
  useDeleteFeaturesMutation,
} = featuresApiSlice;
