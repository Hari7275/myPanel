import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const fluteMagzineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getfluteMagzineList: builder.query({
      query: () => ({
        url: `/meta/magazine_categories/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createfluteMagzine: builder.mutation({
      query: (body) => ({
        url: `/meta/magazine_categories/admin/add`,
        method: "POST",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updatefluteMagzine: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/magazine_categories/admin/update/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deletefluteMagzine: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/magazine_categories/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetfluteMagzineListQuery,
  useCreatefluteMagzineMutation,
  useUpdatefluteMagzineMutation,
  useDeletefluteMagzineMutation,
} = fluteMagzineApiSlice;
