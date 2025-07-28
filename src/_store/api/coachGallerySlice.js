import apiSlice from "./api";
import { getAdminToken } from "./tokenHelper";

export const galleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryList: builder.query({
      query: (id) => ({
        url: `api/v1/consultant/profile/admin/details/${id}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["gallery"],
    }),

    // ***************************crop image by react crooper **************************

    updateConsultantGallery: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/update-image/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),
    //////////////////////////// upload image  /api/v1/consultant/profile/photos/27 //////////////////////////////////////////////

    createConsultantGallery: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/${id}`,
        method: "POST",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),

    //////////////////////////// upload cover image //////////////////////////////////////////////

    createConsultantCoverPhoto: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/${id}?photo_type=2`,
        method: "POST",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),

    //////////////////////////// update   image status //////////////////////////////////////////////

    updateConsultantGalleryStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),
    // set profile pic
    updateConsultantProfilePic: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),
    // *************************************** set profile pic reject ****************************************
    updateConsultantRejectProfilePic: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/admin/reject-image-request/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["gallery"],
    }),

    // delete consultant photo
    deleteGallery: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/admin/delete-image/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetGalleryListQuery,
  useUpdateConsultantGalleryMutation,
  useCreateConsultantGalleryMutation,
  useCreateConsultantCoverPhotoMutation,
  useUpdateConsultantGalleryStatusMutation,
  useUpdateConsultantProfilePicMutation,
  useUpdateConsultantRejectProfilePicMutation,
  // useUpdateConsultantProfilePicUserRequestMutation,
  useDeleteGalleryMutation,
} = galleryApiSlice;
