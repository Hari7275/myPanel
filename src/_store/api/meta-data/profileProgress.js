import apiSlice from "../api";

export const profileProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileProgressList: builder.query({
      query: () => ({
        url: `api/v1/consultant/auth/onboard-level/admin/get-all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    createProfileProgress: builder.mutation({
      query: ({ body }) => ({
        url: `api/v1/consultant/auth/onboard-level/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateProfileProgress: builder.mutation({
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

    // deleteCoachRate: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/consultant_rate/admin/delete/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer admin_token",
    //     },
    //   }),
    //   invalidatesTags: ["consultant"],
    // }),
  }),
});

export const {
  useGetProfileProgressListQuery,
  useCreateProfileProgressMutation,
  useUpdateProfileProgressMutation,
//   useDeleteCoachRateMutation,
} = profileProgressApiSlice;
