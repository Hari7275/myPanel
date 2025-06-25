import apiSlice from "../api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      async queryFn(id, api) {
        const state = api.getState();
        const prod = state.auth?.prod;

        console.log("🚧 PROD FLAG IN QUERY:", prod);

        const url = prod
          ? `/user/profile/qd/participants/get_participants_by_event/${id}?limit=150&page=1`
          : `/user/qd/participants/get_participants_by_event/${id}?limit=150&page=1`;

        const rawBaseQuery = fetchBaseQuery({
          baseUrl: prod
            ? "https://api.fluteconnect.com/"
            : "https://dev-api.fluteconnect.com/",
          prepareHeaders: (headers) => {
            headers.set("Authorization", "Bearer admin_token");
            return headers;
          },
        });

        const result = await rawBaseQuery({ url, method: "GET" }, api, {});
        return result;
      },
      providesTags: ["participants"],
    }),
  }),
});

export const {
  useGetQDEventsListQuery,

  useGetQDParticipantsListQuery,
} = quickDateApiSlice;
