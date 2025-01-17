import apiSlice from "../api";

export const consultantsLiveStreamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStreamList: builder.query({
      query: () => ({
        url: `/api/v1/live-stream/stream/admin/list?page=1&size=10&consultant_id=36`,
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

export const { useGetLiveStreamListQuery , useUpdateLiveStreamStatusMutation } = consultantsLiveStreamApiSlice;
