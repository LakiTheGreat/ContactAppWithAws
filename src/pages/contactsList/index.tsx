import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormProvider from "components/hook-form/FormProvider";
import Page from "components/Page";
import DataGridToolbar from "components/DataGridToolbar";
import useContactsColumns from "./useContactsColumns";
import useConfirmDialog from "hooks/useConfirmDialog";
import { CONTACTS_ROUTES } from "routes/paths";
import {
  useDeleteManyContactsMutation,
  useDeleteOneContactMutation,
  useEditContactMutation,
  useGetAllContactsQuery,
} from "api/contacts";
import SidebarFilter from "./SidebarFilter";
import applyFilterForContacts from "utils/applyFilterForContacts";
import useResponsive from "hooks/useResponsive";
import { SidebarFilters, SingleContact } from "types";
import { useSnackbar } from "notistack";
import { useGetAllLabelsQuery } from "api/labels";

export default function AllContacts() {
  const { enqueueSnackbar } = useSnackbar();
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const navigate = useNavigate();
  const isDesktop = useResponsive("up", "lg");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [open, setOpen] = useState<boolean>(false);

  const { data: labelData, isLoading: labelIsLoading } =
    useGetAllLabelsQuery(undefined);
  const { data, isLoading } = useGetAllContactsQuery(undefined);
  const [
    deleteContact,
    {
      data: deleteContactData,
      isLoading: deleteContactIsLoading,
      isError: deleteContactIsError,
    },
  ] = useDeleteOneContactMutation();

  const [
    deleteManyContacts,
    {
      data: deleteManyContactData,
      isLoading: deleteManyContactIsLoading,
      isError: deleteManyContactIsError,
    },
  ] = useDeleteManyContactsMutation();

  const [editContact] = useEditContactMutation();

  useEffect(() => {
    deleteContactData &&
      enqueueSnackbar("Contact successfully deleted.", {
        variant: "success",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContactData]);

  useEffect(() => {
    deleteContactIsError &&
      enqueueSnackbar("Contact was not deleted. Something went wrong!", {
        variant: "error",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContactIsError]);

  useEffect(() => {
    deleteManyContactData &&
      enqueueSnackbar(`Number of deleted contacts: ${selectedIds.length}`, {
        variant: "success",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyContactData]);
  useEffect(() => {
    deleteManyContactIsError &&
      enqueueSnackbar(
        "Something went wrong. Some or all contacts were not deleted!",
        {
          variant: "error",
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyContactIsError]);

  const defaultValues: SidebarFilters = {
    favoritesOnly: false,
    arrayOfLabelIds: [],
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset, watch } = methods;
  const values = watch();

  const handleResetFilter = () => {
    reset();
  };

  const handleBatchDelete = () => {
    deleteManyContacts(selectedIds);
  };

  const handleFavorite = (contact: SingleContact) => {
    const newContact: SingleContact = {
      ...contact,
      isFavorite: contact.isFavorite ? false : true,
    };
    editContact(newContact);
  };

  const handleEdit = (contactId: string) => {
    navigate(`${CONTACTS_ROUTES.edit}/${contactId}`);
  };
  const handleDelete = async (contactId: string) => {
    const isConfirmed = await getConfirmation({
      title: "Delete contact",
      contentText: "Are you sure you want to delete this contact?",
      confirmLabel: `Delete`,
    });
    isConfirmed && deleteContact(contactId);
  };

  const columns = useContactsColumns({
    handleFavorite,
    handleDelete,
    handleEdit,
  });
  let filteredContacts: SingleContact[] = [];

  if (data) {
    filteredContacts = applyFilterForContacts(data, values);
  }

  const somethingIsLoading =
    isLoading || deleteContactIsLoading || deleteManyContactIsLoading;

  return (
    <Page title="List">
      <Stack alignItems="center">
        <Card sx={{ m: 5, width: isDesktop ? "1152px" : "90%" }}>
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            rowsPerPageOptions={[15, 30, 50, 100]}
            initialState={{
              sorting: { sortModel: [{ field: "firstName", sort: "asc" }] },
            }}
            rows={filteredContacts}
            rowHeight={50}
            columns={columns}
            loading={somethingIsLoading}
            getRowId={(row) => row.contactId}
            components={{ Toolbar: DataGridToolbar }}
            componentsProps={{
              toolbar: {
                numSelected: selectedIds.length,
                onDelete: handleBatchDelete,
                setOpen: setOpen,
                onClose: () => setOpen(false),
              },
            }}
            onSelectionModelChange={(ids) => setSelectedIds(ids as string[])}
            disableExtendRowFullWidth={true}
          />
          <FormProvider methods={methods}>
            <SidebarFilter
              open={open}
              onResetAll={handleResetFilter}
              labels={labelData}
              onClose={() => setOpen(false)}
              labelIsLoading={labelIsLoading}
              data={data}
            />
          </FormProvider>
          <Confirmation />
        </Card>
      </Stack>
    </Page>
  );
}
