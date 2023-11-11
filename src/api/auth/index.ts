import { api } from "api/api";
import { getCurrentUser } from "api/asyncFunctions";

const authApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      queryFn: getCurrentUser,
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrentUserQuery } = authApiEndpoints;
