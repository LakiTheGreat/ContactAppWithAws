import { GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
// import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import DataGridRowActions from "components/DataGridRowActions";

type Actions = {
  handleFavorite: (_id: string) => void;
  handleDelete: (_id: string) => void;
  handleEdit: (_id: string) => void;
};

export default function useContactsColumns(actions: Actions) {
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: 170,
      renderCell: ({ value }) => (
        <Stack gap={2} direction="row" alignItems="center">
          <Typography variant="subtitle2">{value}</Typography>
        </Stack>
      ),
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: 170,
      renderCell: ({ value }) => (
        <Stack gap={2} direction="row" alignItems="center">
          <Typography variant="subtitle2">{value}</Typography>
        </Stack>
      ),
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 250,
      valueGetter: ({ row }) => row.email,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      flex: 1,
      minWidth: 200,
      valueGetter: ({ row }) => row.phoneNumber,
    },

    {
      field: "actions",
      headerName: "",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <DataGridRowActions
          onFavorite={() => actions.handleFavorite(row._id)}
          onDelete={() => actions.handleDelete(row)}
          onEdit={() => actions.handleEdit(row.contactId)}
          isFavorite={row.isFavorite}
        />
      ),
    },
  ];

  return columns;
}
