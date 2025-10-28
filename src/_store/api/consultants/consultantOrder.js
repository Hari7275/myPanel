import apiSlice from "../api";

export const consultantsOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConsultantsOrder: builder.query({
      query: ({ consultantId, page, pageSize, order_type }) => ({
        url: `/api/v1/consultant/management/order/admin/all-orders?page=${page}&size=${pageSize}&consultant_id=${consultantId}${
          order_type ? `&order_type=${order_type}` : ""
        }`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // https://api.fluteconnect.com/api/v1/consultant/management/offline/admin/list?page=1&size=10&consultant_id=368

    getConsultantsOfflineOrder: builder.query({
      query: ({ consultantId, page, pageSize, order_type }) => ({
        url: `/api/v1/consultant/management/offline/admin/list?page=${page}&size=${pageSize}&consultant_id=${consultantId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer admin_token",
        },
      }),
      providesTags: ["consultants"],
    }),

    // createLanguage: builder.mutation({
    //   query: ({ body }) => ({
    //     url: `/meta/languages/add`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    // updateLanguage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `meta/languages/update_language/${id}`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["languages"],
    // }),

    // deleteLanguage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `meta/languages/delete/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["languages"],
    // }),
  }),
});

export const { useGetConsultantsOrderQuery,useGetConsultantsOfflineOrderQuery } = consultantsOrderApiSlice;
