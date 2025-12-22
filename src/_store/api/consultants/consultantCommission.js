import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantCommissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommissionList: builder.query({
      query: (consultantId) => ({
        // url: `api/v1/consultant/profile/consultant-price-list/admin/consultant-commission/1518?page=1&limit=10`,,
        url: `api/v1/consultant/profile/consultant-price-list/admin/consultant-commission/${consultantId}?page=1&limit=100`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["commission", "consultants"],
    }),

    getNewCommissionList: builder.query({
      query: ({ consultantId, page, size }) => ({
        // url: `api/v1/consultant/profile/consultant-price-list/admin/consultant-commission/1518?page=1&limit=10`,,
        url: `/api/v1/consultant/payment/price-list/admin/consultant-commission/${consultantId}?page=${page}&limit=${size}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
        },
      }),
      providesTags: ["commission", "consultants"],
    }),

    createCommission: builder.mutation({
      query: ({ body, consultantId }) => ({
        url: `api/v1/consultant/profile/consultant-price-list/admin/update-commission/${consultantId}`,
        method: "POST",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["commission", "consultants"],
    }),



    createNewCommission: builder.mutation({
      query: ({ body, consultantId }) => ({
        url: `api/v1/consultant/payment/price-list/admin/update-commission/${consultantId}`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
          // Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["commission", "consultants"],
    }),

    updateCommission: builder.mutation({
      query: ({ id, body }) => ({
        url: `/coach-rating/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["commission", "consultants"],
    }),

    deleteCommission: builder.mutation({
      query: ({ id }) => ({
        url: `coach-rating/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["commission", "consultants"],
    }),
  }),
});

export const {
  useGetCommissionListQuery,
  useGetNewCommissionListQuery,
  useCreateCommissionMutation,
  useCreateNewCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
} = consultantCommissionApiSlice;
