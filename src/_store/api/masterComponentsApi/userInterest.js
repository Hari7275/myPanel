import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";
export const userInterestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get intrest data
    getProfileFeatureList: builder.query({
      query: () => ({
        url: `user/profile/get-user-interests?interestType=profile_feature`,
        method: "GET",
      }),

      providesTags: ["interest"],
    }),

    //  get passion data

    getProfilePassionList: builder.query({
      query: () => ({
        url: `user/profile/get-user-interests?interestType=profile_passion`,
        method: "GET",
      }),

      providesTags: ["interest"],
    }),

    // get prompt data

    getPromptQuestionList: builder.query({
      query: () => ({
        url: `user/profile/get-user-interests?interestType=prompt_questions`,
        method: "GET",
      }),

      providesTags: ["interest"],
    }),

    // get Desire data

    getUserDesireList: builder.query({
      query: () => ({
        url: `user/profile/get-user-interests?interestType=profile_desires`,
        method: "GET",
      }),

      providesTags: ["interest"],
    }),

    // add prompt question

    createPrompt: builder.mutation({
      query: ({ body }) => ({
        url: `/user/profile/admin/add-interest`,
        method: "POST",
        headers: {
          // Authorization: "Bearer internal_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["interest"],
    }),

    // Update prompt question

    updatePrompt: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/profile/admin/update-interest`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer internal_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["interest"],
    }),
    // delete data

    deleteInterest: builder.mutation({
      query: ({ id }) => ({
        url: `/user/profile/admin/delete-interest/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer internal_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["interest"],
    }),
  }),
});

export const {
  useGetProfileFeatureListQuery,
  useGetProfilePassionListQuery,
  useGetPromptQuestionListQuery,
  useGetUserDesireListQuery,
  useCreatePromptMutation,
  useUpdatePromptMutation,
  useDeleteInterestMutation,
} = userInterestApiSlice;
