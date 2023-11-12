import { api } from "api/api";
import {
  createLabel,
  deleteOneLabel,
  editLabel,
  getAllLabels,
} from "api/asyncFunctions/labels";

const labelsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllLabels: build.query({
      queryFn: getAllLabels,
      providesTags: ["Label"],
    }),
    createLabel: build.mutation({
      queryFn: createLabel,
      invalidatesTags: ["Label"],
    }),
    editLabel: build.mutation({
      queryFn: editLabel,
      invalidatesTags: ["Label"],
    }),
    deleteOneLabel: build.mutation({
      queryFn: deleteOneLabel,
      invalidatesTags: ["Label"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllLabelsQuery,
  useCreateLabelMutation,
  useEditLabelMutation,
  useDeleteOneLabelMutation,
} = labelsApiEndpoints;
