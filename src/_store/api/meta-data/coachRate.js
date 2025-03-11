import apiSlice from "../api";

export const coachRateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachRateList: builder.query({
      query: () => ({
        url: `meta/consultant_rate/admin/all?page=1&limit=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    createCoachRate: builder.mutation({
      query: ({ body }) => ({
        url: `meta/consultant_rate/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateCoachRate: builder.mutation({
      query: ({ id, body }) => ({
        url: `meta/consultant_rate/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    deleteCoachRate: builder.mutation({
      query: ({ id }) => ({
        url: `meta/consultant_rate/admin/delete/${id}`,
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
  useGetCoachRateListQuery,
  useCreateCoachRateMutation,
  useUpdateCoachRateMutation,
  useDeleteCoachRateMutation,
} = coachRateApiSlice;
