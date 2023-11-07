import { api } from "api/api";
import { getCurrentUser, signInUser } from "./authQueries";

const authApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    // signIn: build.query({
    //   queryFn: signInUser,
    //   //   invalidatesTags: (result: any) => (result ? ["Auth"] : []),
    // }),
    getCurrentUser: build.query({
      queryFn: getCurrentUser,
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrentUserQuery } = authApiEndpoints;
