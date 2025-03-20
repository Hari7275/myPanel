import apiSlice from "../api";

export const supportExecutiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupportExecutiveList: builder.query({
      query: () => ({
        url: `/api/v1/user/support/service/executive/admin/?page=1&size=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createSupportExecutive: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/user/support/service/executive/admin/`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updateSupportExecutive: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/support/service/executive/admin/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deleteSupportExecutive: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/user/support/service/executive/admin/${id}`,
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
  useGetSupportExecutiveListQuery,
  useCreateSupportExecutiveMutation,
  useUpdateSupportExecutiveMutation,
  useDeleteSupportExecutiveMutation,
} = supportExecutiveApiSlice;
