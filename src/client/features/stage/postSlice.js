import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** Authentication endpoints */
const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // home page posts

    getFollowingPosts: builder.query({
      query: () => "/users/vibe",
      providesTags: ["Post", "DeletePost", "Following", "Like", "Unlike"],
    }),

    //explore page posts

    getPostStage: builder.query({
      query: () => `/users/stage`,
      providesTags: ["Post", "DeletePost", "Unfollowing", "Like", "Unlike"],
    }),

    //get current user id

    getCurrentUser: builder.query({
      query: () => "/users/user-id",
      // providesTags: ["Following", "Unfollowing", "Likes", "Unlikes"],
    }),

    // get user profile

    getUser: builder.query({
      query: (id) => `/users/profile/${id}`,
      providesTags: ["DeletePost", "Post"],
    }),
    // create post
    createPost: builder.mutation({
      query: (credentials) => ({
        url: "/users/posts",
        method: "POST",
        body: credentials,
        invalidatesTags: ["Post"],
      }),
      transformErrorResponse: (response) => response.data,
    }),

    // delete post
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/users/posts/${postId}`,
        method: "DELETE",
        invalidatesTags: ["DeletePost"],
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //follow user
    followUser: builder.mutation({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "POST",
        invalidatesTags: ["Following"],
        providesTags: ["Following"],
      }),
    }),

    //unfollow user
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/users/unfollow/${id}`,
        method: "POST",
        invalidatesTags: ["Unfollowing"],
        providesTags: ["Unfollowing"],
      }),
    }),

    //like function
    like: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/like`,
        method: "POST",
        invalidatesTags: ["Like"],
      }),
    }),
    //unlike function
    unlike: builder.mutation({
      query: (id) => ({
        url: `/users/posts/${id}/unlike`,
        method: "DELETE",
        invalidatesTags: ["Unlike"],
      }),
    }),
    // settings
    updateUsername: builder.mutation({
      query: (username) => ({
        url: "/users/update-username",
        method: "PUT",
        body: username,
      }),
    }),
    //-----
    updateEmail: builder.mutation({
      query: (email) => ({
        url: "/users/update-email",
        method: "PUT",
        body: email,
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
  useDeletePostMutation,
  useGetPostStageQuery,
  useGetUserQuery,
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
} = postApi;
