import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const menuOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getmenuOrderList: builder.query({
      query: ({ id }) => ({
        url: `/meta/menu_items/admin/get_all/${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createmenuOrder: builder.mutation({
      query: (body) => ({
        url: `/meta/menu_items/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updatemenuOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/menu_items/admin/update/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deletemenuOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/menu_items/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["consultant"],
    }),

    // **************************** menu item list for all active user *************************************

    getactiveMenuOrderList: builder.query({
      query: () => ({
        url: `/meta/menu_items/get_all/0`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetmenuOrderListQuery,
  useCreatemenuOrderMutation,
  useUpdatemenuOrderMutation,
  useDeletemenuOrderMutation,
  useGetactiveMenuOrderListQuery,
} = menuOrderApiSlice;
