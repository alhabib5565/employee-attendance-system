import { tags } from "../tag-types";
import { baseApi } from "./baseApi";

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestForLeave: builder.mutation({
      query: (data) => ({
        url: `/leaves/request-for-leave`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Leaves],
    }),

    editLeaves: builder.mutation({
      query: ({ data, id }) => ({
        url: `/leaves/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Leaves],
    }),

    getAllLeaveRequest: builder.query({
      query: (query) => {
        const queryParmas = new URLSearchParams(query);
        return {
          url: `/leaves?${queryParmas}`,
        };
      },
      providesTags: [tags.Leaves],
    }),

    getSingleLeaves: builder.query({
      query: (id) => ({
        url: `/leaves/${id}`,
      }),
      providesTags: [tags.Leaves],
    }),
  }),
});

export const {
  useRequestForLeaveMutation,
  useEditLeavesMutation,
  useGetAllLeaveRequestQuery,
  useGetSingleLeavesQuery,
} = leaveApi;
