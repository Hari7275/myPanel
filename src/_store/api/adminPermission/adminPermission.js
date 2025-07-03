import apiSlice from "../api";

export const adminPermissionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionList: builder.query({
      query: ({ group_id }) => ({
        url: `/api/v1/admin-service/admin/permissions/get-all/${group_id}?page=1&size=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["admin"],
    }),

    createPermission: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admin-service/admin/permissions`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    updatePermission: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/admin-service/admin/permissions/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deletePermission: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/admin-service/admin/permissions/${id}`,
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
  useGetPermissionListQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = adminPermissionSlice;
