import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const userListingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: ({
        page,
        limit,
        id,
        name,
        user_id,
        phone_number,
        start_date,
        end_date,
        platformType,
      }) => ({
        url: `user/profile/all-users?page=${page}&limit=${limit}&name=${name}&user_id=${user_id}&phone=${phone_number}&start_date=${start_date}&end_date=${end_date}&platform=${platformType}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      // extraOptions: {
      //   timeoutMs: 4000, // ✅ Correct placement
      // },
      providesTags: ["user"],
    }),

    updateUserDatingStatus: builder.mutation({
      query: ({ user_id, id, body }) => ({
        url: `user/profile/update-user-status/${user_id}/${id}`,
        // url: `api/v1/user/auth/update-status/${user_id}}`,
        method: "PUT",
        headers: {
          Authorization: getAdminToken(),
          // Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["user"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ user_id, body }) => ({
        url: `api/v1/user/auth/update-status/${user_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    //****************** */ update user type
    updateUserType: builder.mutation({
      query: ({ user_id, body }) => ({
        url: `user/profile/admin/update-user-type/${user_id}`,
        method: "PATCH",
        body,
        headers: {
          Authorization: getAdminToken(),
          // Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useUpdateUserStatusMutation,
  useUpdateUserDatingStatusMutation,
  useUpdateUserTypeMutation,
} = userListingSlice;
