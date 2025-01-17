import apiSlice from "../api";

export const userGalleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserGallery: builder.mutation({
      query: ({ formData }) => ({
        url: `/user/profile/update-image`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["gallery"],
    }),

    createUserGallery: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/profile/upload-admin-image/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["gallery"],
    }),

    updateUserGalleryStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/profile/update-image-status/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["gallery"],
    }),

    // update profile photo of user

    updateUserProfilePic: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/profile/admin/set-profile-image/${id}?requestType=admin`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["gallery"],
    }),

    // update status for verification request photo  of user

    updateUserVerificationStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `user/profile/admin/update-verification-status/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["gallery"],
    }),

    deleteUserGallery: builder.mutation({
      query: ({ id }) => ({
        url: `/user/profile/delete-profile-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useUpdateUserGalleryMutation,
  useCreateUserGalleryMutation,
  useUpdateUserGalleryStatusMutation,
  useUpdateUserProfilePicMutation,
  useUpdateUserVerificationStatusMutation,
  useDeleteUserGalleryMutation,
} = userGalleryApiSlice;
