import apiSlice from "../api";

export const qdLoactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getqdLoactionList: builder.query({
      query: () => ({
        url: `/meta/qd_type/get_all_qds/trip?page=1&size=200`,
        method: "GET",
        headers: {
          Authorization: "Bearer guest_token",
        },
      }),
      providesTags: ["loaction"],
    }),
    createqdLoactionList: builder.mutation({
      query: (body) => ({
        url: `/meta/qd_type/admin/add/trip`,
        method: "POST",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["loaction"],
    }),
    updateqdLoactionList: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/qd_type/admin/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["loaction"],
    }),
    deleteqdLoactionList: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/qd_type/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["loaction"],
    }),

    // get the city list for add loaction

    getCityLoactionList: builder.query({
      query: ({ keyword }) => ({
        url: `/meta/qd_type/location_search?keyword=${keyword}`,
        method: "GET",
        headers: {
          Authorization: "Bearer guest_token",
        },
      }),
      providesTags: ["loaction"],
    }),
  }),
});

export const {
  useGetqdLoactionListQuery,
  useCreateqdLoactionListMutation,
  useUpdateqdLoactionListMutation,
  useDeleteqdLoactionListMutation,
  useGetCityLoactionListQuery,
} = qdLoactionApiSlice;
