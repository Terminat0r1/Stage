import api from "../../store/api";

/** Authentication endpoints */
const stageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostPitts: builder.query({
      query: () => `/users/stage`,
    }),

    getPostByLocation: builder.query({
      query: (location) => `/users/posts/location/${location}`,

      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetPostPittsQuery, useGetPostByLocationQuery } = stageApi;
