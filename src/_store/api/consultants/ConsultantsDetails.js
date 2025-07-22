import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const consultantsDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsDetails: builder.query({
      query: (id) => ({
        url: `api/v1/consultant/profile/admin/details/${id}`,
        method: "GET",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      providesTags: ["consultants", "gallery"],
    }),

    updateConsultantsDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/consultant/profile/update/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetConsultantsDetailsQuery,
  useUpdateConsultantsDetailsMutation,
} = consultantsDetailsApiSlice;
