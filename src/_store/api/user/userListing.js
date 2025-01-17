import apiSlice from "../api";

export const userListingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: ({ page, limit, id, name, user_id }) => ({
        url: `user/profile/all-users?page=${page}&limit=${limit}&name=${name}&user_id=${user_id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUserDatingStatus: builder.mutation({
      query: ({ user_id, id, body }) => ({
        url: `user/profile/update-user-status/${user_id}/${id}`,
        // url: `api/v1/user/auth/update-status/${user_id}}`,
        method: "PUT",
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
  }),
});

export const {
  useGetUsersListQuery,
  useUpdateUserStatusMutation,
  useUpdateUserDatingStatusMutation,
} = userListingSlice;
