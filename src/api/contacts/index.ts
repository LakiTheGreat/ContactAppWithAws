import { api } from "api/api";
import {
  createContact,
  editContact,
  // createOneContact,
  getAllContacts,
  getContactById,
} from "api/asyncFunctions";

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
    createContact: build.mutation({
      queryFn: createContact,
      invalidatesTags: ["Contact"],
    }),
    editContact: build.mutation({
      queryFn: editContact,
      invalidatesTags: ["Contact"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useEditContactMutation,
} = contactsApiEndpoints;
