import apiSlice from "../api";

export const messageTemplateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessageTemplates: builder.query({
      query: ({ role }) => ({
        url: `/api/v1/chat/message-templates/admin/get-all?role=${role}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["MessageTemplate"],
    }),

    createMessageTemplate: builder.mutation({
      query: ({ role, body }) => ({
        url: `/api/v1/chat/message-templates/admin/create-message-template?role=${role}`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["MessageTemplate"],
    }),

    updateMessageTemplate: builder.mutation({
      query: ({ role, id, body }) => ({
        url: `/api/v1/chat/message-templates/admin/update-message-template?role=${role}&id=${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["MessageTemplate"],
    }),
  }),
});

export const {
  useGetMessageTemplatesQuery,
  useCreateMessageTemplateMutation,
  useUpdateMessageTemplateMutation,
} = messageTemplateApiSlice;
