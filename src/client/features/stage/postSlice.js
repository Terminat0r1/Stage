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
        invalidatesTags: ["Following", "Unfollowing", "Likes", "Unlikes"],
      }),
      transformErrorResponse: (response) => response.data,
    }),
    getFollowingPosts: builder.query({
      query: () => "/users/vibe",
      providesTags: ["Following", "Unfollowing", "Likes", "Unlikes"],
    }),

    getCurrentUser: builder.query({
      query: () => "/users/user-id",
      // providesTags: ["Following", "Unfollowing", "Likes", "Unlikes"],
    }),

    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/users/unfollow/${id}`,
        method: "POST",
        invalidatesTags: ["Unfollowing", "Following"],
      }),
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "POST",
        invalidatesTags: ["Unfollowing", "Following"],
        providesTags: ["Following"],
      }),
    }),

    like: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/like`,
        method: "POST",
        invalidatesTags: ["likes", "Unlikes"],
        providesTags: ["likes", "Unlikes"],
      }),
    }),

    unlike: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/unlike`,
        method: "DELETE",
        invalidatesTags: ["Unlikes", "likes"],
        providesTags: ["Unlikes", "likes"],
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetFollowingPostsQuery,
  useGetCurrentUserQuery,
  useUnfollowUserMutation,
  useFollowUserMutation,
  useLikeMutation,
  useUnlikeMutation,
} = postApi;
