// form
import { useFormContext, Controller } from "react-hook-form";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControlLabelProps,
  Typography,
  Stack,
  Box,
} from "@mui/material";

import { Label } from "types";
import { IconButtonAnimate } from "components/animate";
import EditLabel from "pages/labelsForm/EditLabel";
import { useState } from "react";

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, "control"> {
  name: string;
}

export function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

// export interface Options {
//   label: Label;
// }
interface RHFMultiCheckboxProps
  extends Omit<FormControlLabelProps, "control" | "label"> {
  name: string;
  options: Label[];
}

export function RHFMultiCheckbox({ name, options }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [labelToEdit, setLabelToEdit] = useState<Label | null>(null);

  const handleOpenEditModal = (label: Label) => {
    setLabelToEdit(label);
    setIsOpen(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        return (
          <>
            <FormGroup>
              {options.map((option) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={option.labelId}
                >
                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      checked={field.value.includes(option.labelId)}
                      onChange={() =>
                        field.onChange(onSelected(option.labelId))
                      }
                    />
                    <Typography variant="body1">{option.labelName}</Typography>
                  </Stack>
                  <Stack direction="row">
                    <Box>
                      <IconButtonAnimate
                        size="small"
                        aria-label={"Edit label icon"}
                        onClick={() => handleOpenEditModal(option)}
                      >
                        <ModeEditOutlineOutlinedIcon />
                      </IconButtonAnimate>
                    </Box>
                    <Box>
                      <IconButtonAnimate
                        size="small"
                        aria-label={"Delete label icon"}
                      >
                        <DeleteOutlineIcon />
                      </IconButtonAnimate>
                    </Box>
                  </Stack>
                </Stack>
              ))}
            </FormGroup>
            <EditLabel
              isOpen={isOpen}
              handleClose={() => setIsOpen(false)}
              label={labelToEdit}
            />
          </>
        );
      }}
    />
  );
}
