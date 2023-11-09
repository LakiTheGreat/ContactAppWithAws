import { api } from "api/api";
import { getAllContacts, getContactById } from "api/asyncFunctions";

const contactsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllContacts: build.query({
      queryFn: getAllContacts,
      providesTags: ["Contact"],
    }),
    getContactById: build.query({
      queryFn: getContactById,
      providesTags: ["Contact"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllContactsQuery, useGetContactByIdQuery } =
  contactsApiEndpoints;
