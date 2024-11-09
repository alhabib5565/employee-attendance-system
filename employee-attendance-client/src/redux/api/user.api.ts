import { tags } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/employees/create-employee`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Users],
    }),

    editUsers: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Users],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/employees",
      }),
      providesTags: [tags.Users],
    }),

    getSingleUsers: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: [tags.Users],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useEditUsersMutation,
  useGetAllUsersQuery,
  useGetSingleUsersQuery,
} = userApi;
