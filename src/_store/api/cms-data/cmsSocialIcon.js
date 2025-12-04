import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsSocialIconApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsSocialIconList: builder.query({
      query: () => ({
        url: `/meta/social-icon/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["banner"],
    }),

    createCmsSocialIcon: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/social-icon/admin/add`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsSocialIcon: builder.mutation({
      query: ({ body, id }) => ({
        url: `/meta/social-icon/admin/update/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsSocialIcon: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/social-icon/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetCmsSocialIconListQuery,
  useCreateCmsSocialIconMutation,
  useUpdateCmsSocialIconMutation,
  useDeleteCmsSocialIconMutation,
} = cmsSocialIconApiSlice;
