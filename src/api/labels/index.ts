import { api } from "api/api";
import { getAllLabels } from "api/asyncFunctions/labels";

const labelsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllLabels: build.query({
      queryFn: getAllLabels,
      providesTags: ["Label"],
    }),
    // getContactById: build.query({
    //   queryFn: getContactById,
    //   providesTags: ["Contact"],
    // }),
    // createContact: build.mutation({
    //   queryFn: createContact,
    //   invalidatesTags: ["Contact"],
    // }),
    // editContact: build.mutation({
    //   queryFn: editContact,
    //   invalidatesTags: ["Contact"],
    // }),
    // deleteOneContact: build.mutation({
    //   queryFn: deleteOneContact,
    //   invalidatesTags: ["Contact"],
    // }),
    // deleteManyContacts: build.mutation({
    //   queryFn: deleteManyContacts,
    //   invalidatesTags: ["Contact"],
    // }),
  }),
  overrideExisting: false,
});

export const { useGetAllLabelsQuery } = labelsApiEndpoints;
