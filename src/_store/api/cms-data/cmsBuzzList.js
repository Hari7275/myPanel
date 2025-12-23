import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const cmsBuzzListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsBuzzList: builder.query({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);
        return {
          url: `/api/v1/content-management/admin/flute-buzz?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),

    createCmsBuzzList: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/create-flute-buzz`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsBuzzList: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/flute-buzz/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsBuzzList: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/flute-buzz/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
          //   Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetCmsBuzzListQuery,
  useCreateCmsBuzzListMutation,
  useUpdateCmsBuzzListMutation,
  useDeleteCmsBuzzListMutation,
} = cmsBuzzListApiSlice;
