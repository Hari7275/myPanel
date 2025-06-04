import apiSlice from "../api";

export const adminPermissionGroupSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPermissionGroupList: builder.query({
      query: () => ({
        url: `/api/v1/admin-service/admin/group-permissions?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["admin"],
    }),

    createAdminPermissionGroup: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admin-service/admin/group-permissions`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    updateAdminPermissionGroup: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/admin-service/admin/group-permissions/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdminPermissionGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/admin-service/admin/group-permissions/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAdminPermissionGroupListQuery,
  useCreateAdminPermissionGroupMutation,
  useUpdateAdminPermissionGroupMutation,
  useDeleteAdminPermissionGroupMutation,
} = adminPermissionGroupSlice;
