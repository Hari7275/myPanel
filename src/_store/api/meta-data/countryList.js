import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const countryListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: () => ({
        url: `/meta/qd_type/admin/get-countries`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["country"],
    }),

    updateCountryList: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/qd_type/admin/update-country/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["country"],
    }),
  }),
});

export const { useGetCountryListQuery, useUpdateCountryListMutation } =
  countryListApiSlice;
