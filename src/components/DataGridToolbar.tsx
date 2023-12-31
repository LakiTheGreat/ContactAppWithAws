import { useTheme, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Dispatch } from "react";

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

type Props = {
  numSelected: number;
  onDelete: () => void;
  setOpen: Dispatch<boolean>;
};

export default function DataGridToolbar({
  numSelected,
  onDelete,
  setOpen,
}: Props) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? "primary.main" : "text.primary",
          bgcolor: isLight ? "primary.lighter" : "primary.dark",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <GridToolbarQuickFilter variant="outlined" sx={{ width: 240 }} />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter">
          <IconButton aria-label="filter" onClick={() => setOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
