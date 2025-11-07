import apiSlice from "../api";

export const consultantSupportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantSupportExecutiveList: builder.query({
      query: () => ({
        url: `/api/v1/user/support/service/executive/admin/all_executive`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),
    createConsultantSupportExecutive: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/user/support/service/executive/admin/create_executive`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    updateConsultantSupportExecutive: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/support/service/executive/admin/update_executive/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateConsultantSupportExecutiveStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/support/service/executive/admin/update_executive_status/${id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),
    deleteConsultantSupportExecutive: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/user/support/service/executive/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetConsultantSupportExecutiveListQuery,
  useCreateConsultantSupportExecutiveMutation,
  useUpdateConsultantSupportExecutiveMutation,
  useUpdateConsultantSupportExecutiveStatusMutation,
  useDeleteConsultantSupportExecutiveMutation,
} = consultantSupportApiSlice;
