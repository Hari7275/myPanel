import apiSlice from "../api";

export const quickDateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQDEventsList: builder.query({
      query: (userId) => ({
        url: `user/profile/admin/qd-list?limit=10&page=1&user_id=${userId}`,
        method: "GET",
      }),
      providesTags: ["qdevents"],
    }),

    // *************************************************** quickDate participants ***********************************************************

    getQDParticipantsList: builder.query({
      query: ( id) => ({
        url: `/user/profile/meetup_participant/get_participants_by_event/${id}?limit=50&page=1`,
        method: "GET",
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
