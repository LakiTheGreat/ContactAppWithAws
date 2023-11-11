import { api } from "api/api";
import {
  createContact,
  deleteManyContacts,
  deleteOneContact,
  editContact,
  // createOneContact,
  getAllContacts,
  getContactById,
} from "api/asyncFunctions/contacts";

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
    deleteOneContact: build.mutation({
      queryFn: deleteOneContact,
      invalidatesTags: ["Contact"],
    }),
    deleteManyContacts: build.mutation({
      queryFn: deleteManyContacts,
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
  useDeleteOneContactMutation,
  useDeleteManyContactsMutation,
} = contactsApiEndpoints;
