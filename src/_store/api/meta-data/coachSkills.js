import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const coachSkillsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachSkillsList: builder.query({
      query: () => ({
        url: `meta/coach_skill/admin/get_all`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultant"],
    }),

    createCoachSkills: builder.mutation({
      query: ({ body }) => ({
        url: `/meta/coach_skill/admin/add`,
        method: "POST",
        headers: {
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateCoachSkills: builder.mutation({
      query: ({ id, body }) => ({
        url: `/meta/coach_skill/admin/update/${id}`,
        method: "PUT",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    updateCoachSkillsOrder: builder.mutation({
      query: (body) => ({
        url: `/meta/coach_skill/admin/update-display-order`,
        method: "PATCH",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
        body,
      }),
      invalidatesTags: ["consultant"],
    }),

    deleteCoachSkills: builder.mutation({
      query: ({ id }) => ({
        url: `/meta/coach_skill/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: "Bearer admin_token",
          Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["consultant"],
    }),
  }),
});

export const {
  useGetCoachSkillsListQuery,
  useCreateCoachSkillsMutation,
  useUpdateCoachSkillsMutation,
  useDeleteCoachSkillsMutation,
  useUpdateCoachSkillsOrderMutation,
} = coachSkillsApiSlice;
