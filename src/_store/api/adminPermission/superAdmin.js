import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const superAdminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuperAdminList: builder.query({
      query: () => ({
        url: `/api/v1/consultant/profile/admin/notices?page=1&size=100`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["admin"],
    }),

    createSuperAdmin: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/profile/admin/notices`,
        method: "POST",
        body,
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),

    updateSuperAdmin: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/profile/admin/update-notices`,
        method: "PUT",
        body,
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteSuperAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/admin/notices/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetSuperAdminListQuery,
  useCreateSuperAdminMutation,
  useUpdateSuperAdminMutation,
  useDeleteSuperAdminMutation,
} = superAdminSlice;
