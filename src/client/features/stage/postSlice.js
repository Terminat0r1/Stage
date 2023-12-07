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

    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/users/unfollow/${id}`,
        method: "POST",
      }),
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "POST",
      }),
    }),

    like: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/like`,
        method: "POST",
      }),
    }),

    unlike: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/unlike`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetFollowingPostsQuery,
  useUnfollowUserMutation,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} = postApi;
