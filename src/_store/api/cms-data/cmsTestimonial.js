import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const cmsTestimonialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCmsTestimonialList: builder.query({
      query: ({ page, pageSize }) => {
        const params = new URLSearchParams({});
        if (page) params.append("page", page);
        if (pageSize) params.append("limit", pageSize);

        return {
          url: `/api/v1/content-management/admin/testimonials?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["banner"],
    }),
    createCmsTestimonial: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/admin/testimonials`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    updateCmsTestimonial: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/admin/testimonials/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),

    deleteCmsTestimonial: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/admin/testimonials/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetCmsTestimonialListQuery,
  useCreateCmsTestimonialMutation,
  useUpdateCmsTestimonialMutation,
  useDeleteCmsTestimonialMutation,
} = cmsTestimonialApiSlice;
