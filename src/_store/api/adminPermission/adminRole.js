import apiSlice from "../api";

export const adminRoleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminRoleList: builder.query({
      query: () => ({
        url: `/api/v1/admin-service/admin/roles?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["admin"],
    }),
    getAdminselectedPermissionList: builder.query({
      query: (role_id) => ({
        url: `/api/v1/admin-service/admin/permissions/permission-and-groups/?role_id=${role_id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["admin"],
    }),

    createAdminRole: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admin-service/admin/roles`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    createAdminRolePermission: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admin-service/admin/permissions/add-role-permission`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    updateAdminRole: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/admin-service/admin/roles/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdminRole: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/admin-service/admin/roles/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["admin"],
    }),

    getAdminAssignPermissionList: builder.query({
      query: () => ({
        url: `/api/v1/admin-service/admin/permissions/permission-and-groups`,
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..j60DWi0_T9yY4Ft2RhPhXw.zdSHOpZ-XSh0C3tr0HuHZCytq63nfd2f_nMe7UVIzbDXutGgMnK8tvZzljrTm5Q90fNJudb10B0EQ--HoTkMiqsga9V774WF169RIPPbQfJR0Q58ioRmQtVrrssChOY4IgblCPDqssgp2bOIpdca61-0sMH1g4GcoW9CYbOkvkXdPvFMqFrDKK5wQbn9r73tAW9_zKOVJiM5fGceO_DxMwkFus_54Yimffde3VCLZIU.bIbMqUUp5cGvB2VyysLQ0Q",
        },
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAdminRoleListQuery,
  useCreateAdminRoleMutation,
  useCreateAdminRolePermissionMutation,
  useUpdateAdminRoleMutation,
  useDeleteAdminRoleMutation,
  useGetAdminAssignPermissionListQuery,

  useGetAdminselectedPermissionListQuery,
} = adminRoleSlice;
