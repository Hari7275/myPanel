import apiSlice from "../api";

export const serviceRateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServiceRateList: builder.query({
      query: () => ({
        url: `meta/consultant_service_rate/admin/all?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    createServiceRate: builder.mutation({
      query: ({ body }) => ({
        url: `meta/consultant_service_rate/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateServiceRate: builder.mutation({
      query: ({ id, body }) => ({
        url: `meta/consultant_service_rate/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    deleteServiceRate: builder.mutation({
      query: ({ id }) => ({
        url: `meta/consultant_service_rate/admin/delete/${id}`,
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
  useGetServiceRateListQuery,
  useCreateServiceRateMutation,
  useUpdateServiceRateMutation,
  useDeleteServiceRateMutation,
} = serviceRateApiSlice;
