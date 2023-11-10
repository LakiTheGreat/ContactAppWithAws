import { api } from "api/api";
import { createContact, getCurrentUser } from "api/asyncFunctions";

const authApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      queryFn: getCurrentUser,
      providesTags: ["Auth"],
    }),
    createContact: build.mutation({
      queryFn: createContact,
      invalidatesTags: ["Contact"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrentUserQuery, useCreateContactMutation } =
  authApiEndpoints;
