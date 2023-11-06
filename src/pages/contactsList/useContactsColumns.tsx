import { GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
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
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 350,
      renderCell: ({ value, row }) => (
        <Stack gap={2} direction="row" alignItems="center">
          <Avatar
            alt="contact_image"
            src={row?.image || "https://via.placeholder.com/150"}
          />
          <Typography variant="subtitle2">{value}</Typography>
        </Stack>
      ),
    },

    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      minWidth: 250,
      valueGetter: ({ row }) => row.email,
    },
    {
      field: "phoneNumber",
      headerName: "PHONE NUMBER",
      flex: 1,
      minWidth: 100,
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
          onEdit={() => actions.handleEdit(row._id)}
          isFavorite={row.isFavorite}
        />
      ),
    },
  ];

  return columns;
}
