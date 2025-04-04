import apiSlice from "../api";

export const quickDateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQDEventsList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/qd-list?limit=10&page=1&user_id=${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["qdevents"],
    }),

    // *************************************************** quickDate participants ***********************************************************

    // user/qd/participants/get_participants_by_event/625?page=1&limit=10
    getQDParticipantsList: builder.query({
      query: (id) => ({
        url: `/user/qd/participants/get_participants_by_event/${id}?limit=150&page=1`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["participants"],
    }),

    // ****************************************************** api for meetup trips list ********************************************************
  }),
});

export const {
  useGetQDEventsListQuery,

  useGetQDParticipantsListQuery,
} = quickDateApiSlice;
