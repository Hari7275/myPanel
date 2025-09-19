import apiSlice from "../api";

export const consultantsLiveStreamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStreamList: builder.query({
      query: ({ id, page, size }) => ({
        url: `/api/v1/live-stream/stream/admin/list?page=${page}&size=${size}&consultant_id=${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // to get the user list which is connected on livestream

    getLiveStreamConnectedUserList: builder.query({
      query: ({ id, page, size }) => ({
        url: `/api/v1/live-stream/viewer/admin/?page=${page}&size=${size}&id=${id}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // update status during consultant live stream

    updateLiveStreamStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/live-stream/stream/admin/${id}`,
        method: "PUT",
        headers: {
          Authorization: "Bearer admin_token",
        },
        body,
      }),
      invalidatesTags: ["consultants"],
    }),
  }),
});

export const {
  useGetLiveStreamListQuery,
  useGetLiveStreamConnectedUserListQuery,
  useUpdateLiveStreamStatusMutation,
} = consultantsLiveStreamApiSlice;
