import { api } from "api/api";
import { getAllContacts } from "api/asyncFunctions";

const contactsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllContacts: build.query({
      queryFn: getAllContacts,
      providesTags: ["Contact"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllContactsQuery } = contactsApiEndpoints;
