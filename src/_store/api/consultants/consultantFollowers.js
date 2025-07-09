import apiSlice from "../api";

export const consultantsFollowersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsFollower: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/profile/follower/admin/${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // get faviourts for listeners
    getListenerFavouriteList: builder.query({
      query: (consultantId) => ({
        url: `/api/v1/consultant/profile/listener-favourites/admin/list/${consultantId}?page=1&size=10`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),
  }),
});

export const { useGetConsultantsFollowerQuery ,useGetListenerFavouriteListQuery} = consultantsFollowersApiSlice;
