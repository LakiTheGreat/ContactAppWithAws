import { GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
// import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import DataGridRowActions from "components/DataGridRowActions";
import { SingleContact } from "types";
import useResponsive from "hooks/useResponsive";

type Actions = {
  handleFavorite: (contact: SingleContact) => void;
  handleDelete: (contactId: string) => void;
  handleEdit: (contactId: string) => void;
};

export default function useContactsColumns(actions: Actions) {
  const isMobile = useResponsive("down", "sm");
  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: isMobile ? 120 : 170,
      renderCell: ({ value }) => (
        <Stack gap={2} direction="row" alignItems="center">
          <Typography variant="body2">{value}</Typography>
        </Stack>
      ),
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: isMobile ? 120 : 170,
      renderCell: ({ value }) => (
        <Stack gap={2} direction="row" alignItems="center">
          <Typography variant="body2">{value}</Typography>
        </Stack>
      ),
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: isMobile ? 220 : 250,
      valueGetter: ({ row }) => row.email,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      flex: 1,
      minWidth: isMobile ? 150 : 200,
      valueGetter: ({ row }) => row.phoneNumber,
    },

    {
      field: "actions",
      headerName: "",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <DataGridRowActions
          onFavorite={() => actions.handleFavorite(row)}
          onDelete={() => actions.handleDelete(row.contactId)}
          onEdit={() => actions.handleEdit(row.contactId)}
          isFavorite={row.isFavorite}
        />
      ),
    },
  ];

  return columns;
}
