import { useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";

import Page from "components/Page";
import DataGridToolbar from "components/DataGridToolbar";
import useContactsColumns from "./useContactsColumns";

import mockedContacts from "__mocks__/mockedContacts.json";
import useConfirmDialog from "hooks/useConfirmDialog";
import { CONTACTS_ROUTES } from "routes/paths";
import firstCharToUpperCase from "utils/firstCharToUpperCase";
import { useGetAllContactsQuery } from "api/contacts";

export default function AllContacts() {
  const { pathname } = useLocation();
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const navigate = useNavigate();
  let title;
  const { data, isLoading } = useGetAllContactsQuery(undefined);

  function filterContacts() {
    const partsWithoutBackslashAtTheEnd = pathname.replace(/\/$/, ""); // removes "/" at the end of the string if it exists
    const parts = partsWithoutBackslashAtTheEnd.split("/");
    const urlTarget = parts[parts.length - 1];

    title = firstCharToUpperCase(urlTarget);

    if (urlTarget === "all") {
      return mockedContacts;
    }

    if (urlTarget === "favorites") {
      const favoriteContacts = mockedContacts.filter(
        (contact) => contact.isFavorite === true
      );
      return favoriteContacts;
    }

    const filteredContactsByLabel = mockedContacts.filter((contact) =>
      contact.labels.some((label) => label.labelName === urlTarget)
    );
    return filteredContactsByLabel;
  }

  const filteredContacts = filterContacts();

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
          // rows={filteredContacts}
          rows={data ? data : []}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.contactId}
          components={{ Toolbar: DataGridToolbar }}
          componentsProps={{
            toolbar: {
              numSelected: selectedIds.length,
              onDelete: handleBatchDelete,
            },
          }}
          onSelectionModelChange={(ids) => setSelectedIds(ids as string[])}
          disableExtendRowFullWidth={true}
        />
        <Confirmation />
      </Card>
    </Page>
  );
}
