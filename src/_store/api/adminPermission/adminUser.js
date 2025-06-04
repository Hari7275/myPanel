import apiSlice from "../api";

const ADMIN_TOKEN =
  "Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4QFA-Y6h5fo7B0WEfdLCow.uvu5mPryHj97TQ4rK9H7rNzjoY8cmUjrMEUVieeTVMxHfYuWCHkm0aXy6qlqd7vj4UGT1FIJfF9aChz4hEEro9wYFPMtHJUh7H5dWYszwxKAU5E1P9JZx0uHL1TxBwy3i4V6RjN1C30S0nNxD-7-sO2QuCtUOUEQ9HCBV5asZvn8bgjW_DD1QN9kgPEQ2-0s1zzaA04P-XlcyMZpGRhp49DRCKgnwa_WyO2B2jHvBxc.f2M2_rMXE-zGh_rqxyGnMA";

export const adminUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUserList: builder.query({
      query: () => ({
        url: `/api/v1/admin-service/admin/admin-user?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: ADMIN_TOKEN,
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
          Authorization: ADMIN_TOKEN,
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
          Authorization: ADMIN_TOKEN,
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdminUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/admin-service/admin/admin-user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: ADMIN_TOKEN,
        },
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
} = adminUserSlice;
