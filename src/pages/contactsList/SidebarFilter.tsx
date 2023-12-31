import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

import AddIcon from "@mui/icons-material/Add";

import Iconify from "components/Iconify";
import { RHFMultiCheckbox } from "components/hook-form/RHFMultiCheckbox";
import RHFSwitch from "components/hook-form/RHFSwitch";
import CreateLabel from "pages/labelsForm/CreateLabel";
import CheckboxSkeleton from "components/CheckboxSkeleton";
import useGetChipsWithNumberOfContacts from "utils/useGetChipsWithNumberOfContacts";

import { Label, SingleContact } from "types";

type Props = {
  open: boolean;
  onResetAll: VoidFunction;
  onClose: VoidFunction;
  labels: Label[];
  labelIsLoading: boolean;
  data: SingleContact[];
};

export default function SidebarFilter({
  open,
  onResetAll,
  onClose,
  labels,
  labelIsLoading,
  data,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    onResetAll();
    onClose();
  };

  const handleCreateNewLabel = () => {
    setIsOpen(true);
  };

  const [favoriteContacts] = useGetChipsWithNumberOfContacts({
    contacts: data,
  });

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
              <Box>
                <RHFSwitch name="favoritesOnly" label="Favorites only" />
                {favoriteContacts}
              </Box>
              <Typography variant="subtitle2">Labels</Typography>
              {labelIsLoading && <CheckboxSkeleton />}
              {labels && (
                <RHFMultiCheckbox
                  name="arrayOfLabelIds"
                  options={labels}
                  sx={{ width: 1 }}
                  contacts={data}
                />
              )}
              <Button
                onClick={handleCreateNewLabel}
                startIcon={<AddIcon />}
                variant="text"
              >
                Create new label
              </Button>
              <CreateLabel
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
              />
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
