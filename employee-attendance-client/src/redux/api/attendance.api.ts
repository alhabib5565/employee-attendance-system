import { tags } from "../tag-types";
import { baseApi } from "./baseApi";

const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkIn: builder.mutation({
      query: (data) => ({
        url: `/attendances/check-in`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Attendances],
    }),

    editAttendances: builder.mutation({
      query: ({ data, id }) => ({
        url: `/attendances/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Attendances],
    }),

    getAllAttendances: builder.query({
      query: () => ({
        url: "/attendances",
      }),
      providesTags: [tags.Attendances],
    }),

    getSingleAttendances: builder.query({
      query: (id) => ({
        url: `/attendances/${id}`,
      }),
      providesTags: [tags.Attendances],
    }),

    checkEmployeeCheckInToday: builder.query({
      query: ({ id, date }) => ({
        url: `/attendances/${id}/${date}`,
      }),
      providesTags: [tags.Attendances],
    }),

    monthlyAttendanceOfAEmployee: builder.query({
      query: ({ id, date }) => ({
        url: `/attendances/montlye-attendance/${id}/${date}`,
      }),
      providesTags: [tags.Attendances],
    }),

    monthlyAttendanceSheet: builder.query({
      query: (query) => ({
        url: `attendances/montlye/attendance/sheet?${query}`,
      }),
      providesTags: [tags.Attendances],
    }),

    getTodaysAttendance: builder.query({
      query: () => ({
        url: `attendances/todays/attendance/of/all/employees`,
      }),
      providesTags: [tags.Attendances],
    }),

    startBreak: builder.mutation({
      query: ({ data, id }) => ({
        url: `/attendances/start-break/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Attendances],
    }),

    endBreak: builder.mutation({
      query: ({ data, id }) => ({
        url: `/attendances/end-break/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Attendances],
    }),
  }),
});

export const {
  useCheckInMutation,
  useEditAttendancesMutation,
  useGetAllAttendancesQuery,
  useGetSingleAttendancesQuery,
  useCheckEmployeeCheckInTodayQuery,
  useMonthlyAttendanceOfAEmployeeQuery,
  useMonthlyAttendanceSheetQuery,
  useGetTodaysAttendanceQuery,
  useStartBreakMutation,
  useEndBreakMutation,
} = attendanceApi;
