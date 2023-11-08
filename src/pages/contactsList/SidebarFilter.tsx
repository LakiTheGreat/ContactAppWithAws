import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import Iconify from "components/Iconify";
import {
  Options,
  RHFMultiCheckbox,
} from "components/hook-form/RHFMultiCheckbox";

import RHFSwitch from "components/hook-form/RHFSwitch";
import LabelModal from "components/LabelModal";

type Props = {
  open: boolean;
  onResetAll: VoidFunction;
  onClose: VoidFunction;
  labels: Options[];
};

export default function SidebarFilter({
  open,
  onResetAll,
  onClose,
  labels,
}: // profilesAreLoading,
Props) {
  const handleClick = () => {
    onResetAll();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: "300px", overflowY: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filter your contacts
          </Typography>
        </Stack>
        <Divider />

        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <RHFSwitch name="favoritesOnly" label="Favorites only" />
              <Typography variant="subtitle2">Labels</Typography>

              {labels && (
                <RHFMultiCheckbox
                  name="labels"
                  options={labels}
                  sx={{ width: 1 }}
                />
              )}
            </Stack>
          </Stack>

          <Box sx={{ p: 3 }}>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={handleClick}
              startIcon={<Iconify icon={"ic:round-clear-all"} />}
            >
              ClearAll
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}
