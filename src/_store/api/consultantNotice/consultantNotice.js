import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const noticeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNoticeList: builder.query({
      query: () => ({
        url: `/api/v1/consultant/profile/admin/notices?page=1&size=100`,
        method: "GET",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["notice"],
    }),

    getConsultantAssignedNoticeList: builder.query({
      query: () => ({
        url: `/api/v1/consultant/profile/admin/notices/assign-list?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["notice"],
    }),

    // ye api notice list jis consultant ko assign hai uski list get karne ke liye hai
    getConsultantListAssignedNotice: builder.query({
      query: ({ noticeId }) => ({
        url: `/api/v1/consultant/profile/admin/notices/assign-list/${noticeId}`,
        method: "GET",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["notice"],
    }),




    getConsultantList: builder.query({
      query: ({ type }) => ({
        url: `/api/v1/consultant/profile/all-list?type=${type}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["notice"],
    }),

    createNotice: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/profile/admin/notices`,
        method: "POST",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    createAssigneConsultantNotice: builder.mutation({
      query: (body) => ({
        url: `/api/v1/consultant/profile/admin/notices/assign`,
        method: "POST",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    updateNotice: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/consultant/profile/admin/update-notices`,
        method: "PUT",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    updateNoticestatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/notices/status/${id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    deleteNotice: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/admin/notices/${id}`,
        method: "DELETE",
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    deleteAssigneConsultantNotice: builder.mutation({
      query: (body) => ({
        url: `/api/v1/consultant/profile/admin/notices/assign/delete`,
        method: "DELETE",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),

    // update particular notice (description)
    updateParticularConsultantDescription: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/notices/update/${id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useGetNoticeListQuery,
  useGetConsultantAssignedNoticeListQuery,
  useGetConsultantListAssignedNoticeQuery,
  useGetConsultantListQuery,
  useCreateNoticeMutation,
  useCreateAssigneConsultantNoticeMutation,
  useUpdateNoticeMutation,
  useUpdateNoticestatusMutation,
  useDeleteNoticeMutation,
  useDeleteAssigneConsultantNoticeMutation,
  useUpdateParticularConsultantDescriptionMutation,
} = noticeApiSlice;
