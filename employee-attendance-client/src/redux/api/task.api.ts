import { tags } from "../tag-types";
import { baseApi } from "./baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/create-task`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Tasks],
    }),

    editTasks: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Tasks],
    }),

    addWorkSession: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tasks/add-work-session/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Tasks],
    }),

    endWorkSession: builder.mutation({
      query: ({ data, id }) => ({
        url: `/tasks/end-work-session/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Tasks],
    }),

    getAllTask: builder.query({
      query: (query) => {
        const queryParmas = new URLSearchParams(query);
        return {
          url: `/tasks?${queryParmas}`,
        };
      },
      providesTags: [tags.Tasks],
    }),

    getSingleTasks: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
      providesTags: [tags.Tasks],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useGetSingleTasksQuery,
  useAddWorkSessionMutation,
  useEndWorkSessionMutation,
  useEditTasksMutation,
} = taskApi;
