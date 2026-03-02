import apiSlice from "../api";
import { getAdminToken } from "../tokenHelper";

export const chatCategoryListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatCategoryList: builder.query({
      query: ({ page, pageSize, categorySearch, roleId }) => {
        const params = new URLSearchParams({});
        // if (page) params.append("page", page);
        // if (pageSize) params.append("limit", pageSize);
        if (categorySearch) params.append("categorySearch", categorySearch);
        if (roleId) params.append("role", roleId);

        return {
          url: `/api/v1/chat/message-templates/admin/get-all?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: "Bearer admin_token",
          },
        };
      },
      providesTags: ["chatCategory"],
    }),

    createChatCategoryList: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/content-management/chat-category`,
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["chatCategory"],
    }),

    updateChatCategoryList: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/v1/content-management/chat-category/${id}`,
        method: "PUT",
        body,
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      invalidatesTags: ["chatCategory"],
    }),

    deleteChatCategoryList: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/content-management/chat-category/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin_token",
          //   Authorization: getAdminToken(),
        },
      }),
      invalidatesTags: ["chatCategory"],
    }),
  }),
});

export const {
  useGetChatCategoryListQuery,
  useCreateChatCategoryListMutation,
  useUpdateChatCategoryListMutation,
  useDeleteChatCategoryListMutation,
} = chatCategoryListApiSlice;
