import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** Authentication endpoints */
const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUsername: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-username",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //-----
    updateEmail: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-email",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //-----------
    updatebirthDate: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-birthdate",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //---------------------
    updatelocation: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-location",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //---------------------
    updatephoto: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-profile-photo",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //---------------------
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/update-password",
        method: "PUT",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),

    //--------------------------
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/profile",
        method: "DELETE",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatebirthDateMutation,
  useUpdatelocationMutation,
  useUpdatephotoMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
} = postApi;
