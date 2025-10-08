import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const metaAppVersionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppVersionList: builder.query({
      query: () => ({
        url: `/meta/app-version/admin/get?page=1&size=50`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["appVersion"],
    }),

    createAppVersion: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/app-version/admin/add`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["appVersion"],
    }),
  }),
});

export const { useGetAppVersionListQuery, useCreateAppVersionMutation } =
  metaAppVersionApiSlice;
