import apiSlice from "../api";

export const qdTripsListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQDTripsEventsList: builder.query({
      query: ({ limit, page }) => ({
        url: `user/profile/admin/qd-list?limit=${limit}&page=${page}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["qdevents"],
    }),
  }),
});

export const { useGetQDTripsEventsListQuery } = qdTripsListApiSlice;
