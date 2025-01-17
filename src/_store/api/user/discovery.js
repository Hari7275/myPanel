import apiSlice from "../api";

export const discoveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsermatchList: builder.query({
      query: (userId) => ({
        url: `services/admin/user-match-list-By-id?action_type=matched&page=1&limit=10&user_id=${userId}`,
        // url: `services/user-match-list/${userId}?action_type=matched`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),

      providesTags: ["discovery"],
    }),

    getUserswipingList: builder.query({
      query: (userId) => ({
        url: `services/user-favourite-like-list/${userId}?type=like&page=1&limit=100&requestType=admin`,
        method: "GET",
      }),

      providesTags: ["discovery"],
    }),

    getUserdescoverysettingsList: builder.query({
      query: (userId) => ({
        url: `services/user-discover-setting-details/${userId}?requestType=admin`,
        method: "GET",
      }),

      providesTags: ["discovery"],
    }),

    getUserComplimentList: builder.query({
      query: (userId) => ({
        url: `services/compliments/${userId}?requestType=admin`,
        method: "GET",
      }),

      providesTags: ["discovery"],
    }),
  }),
});

export const {
  useGetUsermatchListQuery,
  useGetUserswipingListQuery,
  useGetUserdescoverysettingsListQuery,
  useGetUserComplimentListQuery,
} = discoveryApiSlice;
