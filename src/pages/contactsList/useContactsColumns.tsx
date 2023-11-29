import { GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DataGridRowActions from "components/DataGridRowActions";
import useResponsive from "hooks/useResponsive";

import { SingleContactWithImageKey } from "types";
import { Avatar } from "@mui/material";

type Actions = {
  handleFavorite: (contact: SingleContactWithImageKey) => void;
  handleDelete: (contactId: string) => void;
  handleEdit: (contactId: string) => void;
};

export default function useContactsColumns(actions: Actions) {
  const isMobile = useResponsive("down", "sm");
  const columns: GridColDef[] = [
    {
      field: "firstName",
      renderHeader: () => (
        <Typography sx={{ ml: 8.5 }} variant="subtitle2">
          First Name
        </Typography>
      ),
      headerName: "First name",
      flex: 1,
      minWidth: isMobile ? 120 : 170,
      renderCell: ({ row }) => {
        const initials = row.firstName.slice(0, 1) + row.lastName.slice(0, 1);

        return (
          <Stack gap={2} direction="row" alignItems="center" ml={2}>
            <Avatar
              alt="user image"
              src={row?.image}
              {...(initials && { children: initials })}
            />
            <Typography variant="subtitle2">{row.firstName}</Typography>
          </Stack>
        );
      },
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
      sortable: false,
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
