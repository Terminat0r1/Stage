import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** Authentication endpoints */
const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //-----------
    updatebirthDate: builder.mutation({
      query: (birthdate) => ({
        url: "/users/update-birthdate",
        method: "PUT",
        body: birthdate,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //---------------------
    updatelocation: builder.mutation({
      query: (location) => ({
        url: "/users/update-location",
        method: "PUT",
        body: location,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    //---------------------
    updatephoto: builder.mutation({
      query: (photo) => ({
        url: "/users/update-profile-photo",
        method: "PUT",
        body: photo,
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
      query: () => ({
        url: "/users/profile",
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useUpdatebirthDateMutation,
  useUpdatelocationMutation,
  useUpdatephotoMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
} = settingApi;
