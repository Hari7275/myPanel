import apiSlice from "../api";

import { getAdminToken } from "../tokenHelper";

console.log("getAdminToken......", getAdminToken());

export const adminUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUserList: builder.query({
      query: (_arg, api) => ({
        url: `/api/v1/admin-service/admin/admin-user?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["admin"],
    }),

    createAdminUser: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/admin-service/admin/admin-user`,
        method: "POST",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),

    updateAdminUser: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/admin-service/admin/admin-user/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdminUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/admin-service/admin/admin-user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^admin login by email ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    createAdminLogin: builder.mutation({
      query: ({ body }) => ({
        url: `https://dev-api.fluteconnect.com/api/v1/admin-service/admin/admin-user/login`,
        method: "PUT",
        body,
        // headers: {
        //   Authorization: ADMIN_TOKEN,
        // },
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAdminUserListQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
  useCreateAdminLoginMutation,
} = adminUserSlice;
