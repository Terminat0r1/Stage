import api from "../../store/api";

/** Authentication endpoints */
const stageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostStage: builder.query({
      query: () => `/users/stage`,
      providesTags: ["Following", "Unfollowing", "Likes", "Unlikes"],
    }),

    getPostByLocation: builder.query({
      query: (location) => `/users/posts/location/${location}`,

      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetPostStageQuery, useGetPostByLocationQuery } = stageApi;
