import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** Authentication endpoints */
const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (credentials) => ({
        url: "/users/posts",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    getFollowingPosts: builder.query({
      query: () => "/users/vibe",
      // providesTags: ["Students"],
    }),
  }),
});

export const { useCreatePostMutation, useGetFollowingPostsQuery } = postApi;
