import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tags } from "../tag-types";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://employee-attendance-server-ten.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: Object.values(tags),
});
