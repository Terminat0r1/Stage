import api from "../../store/api";

/** Authentication endpoints */
const stageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/profile/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = stageApi;
