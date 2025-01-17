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
  }),
});

export const { useGetConsultantsFollowerQuery } = consultantsFollowersApiSlice;
