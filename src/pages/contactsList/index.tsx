import { useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormProvider from "components/hook-form/FormProvider";
import Page from "components/Page";
import DataGridToolbar from "components/DataGridToolbar";
import useContactsColumns from "./useContactsColumns";
import useConfirmDialog from "hooks/useConfirmDialog";
import { CONTACTS_ROUTES } from "routes/paths";
import { useGetAllContactsQuery } from "api/contacts";
import SidebarFilter from "./SidebarFilter";
import applyFilterForContacts from "utils/applyFilterForContacts";
import { SidebarFilters } from "__mocks__/types";

export default function AllContacts() {
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const navigate = useNavigate();
  let title;
  const { data, isLoading } = useGetAllContactsQuery(undefined);

  const defaultValues: SidebarFilters = {
    favoritesOnly: false,
    labels: [],
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset, watch } = methods;
  const values = watch();

  const handleResetFilter = () => {
    reset();
  };
  console.log("values", values);

  const handleBatchDelete = () => {
    console.log("handleBatchDelete", selectedIds);
  };

  const handleFavorite = (_id: string) => {
    console.log("handleFavorite", _id);
  };

  const handleEdit = (_id: string) => {
    navigate(`${CONTACTS_ROUTES.edit}/${_id}`);
  };
  const handleDelete = async (_id: string) => {
    const isConfirmed = await getConfirmation({
      title: "Delete contact",
      contentText: "Are you sure you want to delete this contact?",
      confirmLabel: `Delete`,
    });
    console.log("handleDelete", _id, isConfirmed);
  };

  const columns = useContactsColumns({
    handleFavorite,
    handleDelete,
    handleEdit,
  });
  let filteredContacts = [];
  if (data) {
    filteredContacts = applyFilterForContacts(data, values);
  }
  return (
    <Page title={`${title}`}>
      <Card sx={{ m: 5 }}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          initialState={{
            sorting: { sortModel: [{ field: "name", sort: "asc" }] },
          }}
          rows={filteredContacts}
          columns={columns}
          loading={isLoading}
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
            labels={[{ label: "work" }, { label: "home" }]}
            onClose={() => setOpen(false)}
          />
        </FormProvider>
        <Confirmation />
      </Card>
    </Page>
  );
}
