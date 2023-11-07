import { api } from "api/api";
import { getCurrentUser, signOutUser } from "./authQueries";

const authApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    signOut: build.mutation({
      queryFn: signOutUser,
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: build.query({
      queryFn: getCurrentUser,
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrentUserQuery, useSignOutMutation } = authApiEndpoints;
