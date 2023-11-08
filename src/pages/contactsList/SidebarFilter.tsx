import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
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
  onResetAll: VoidFunction;
  labels: Options[];
};

export default function SidebarFilter({
  onResetAll,
  // onClose,
  labels,
}: // profilesAreLoading,
Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    onResetAll();
  };
  const handleCreateNewLabel = () => {
    setIsOpen(true);
  };

  return (
    <>
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
            <Button
              onClick={handleCreateNewLabel}
              startIcon={<AddIcon />}
              variant="text"
            >
              Create new label
            </Button>
            <LabelModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
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
    </>
  );
}
