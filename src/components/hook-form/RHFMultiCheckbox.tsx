// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControlLabelProps,
  Typography,
  Stack,
} from "@mui/material";
import firstCharToUpperCase from "utils/firstCharToUpperCase";

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

export interface Options {
  label: string;
}
interface RHFMultiCheckboxProps
  extends Omit<FormControlLabelProps, "control" | "label"> {
  name: string;
  options: Options[];
}

export function RHFMultiCheckbox({
  name,
  options,
  ...other
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();
  console.log(control);

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
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.label}
                control={
                  <Checkbox
                    checked={field.value.includes(option.label)}
                    onChange={() => field.onChange(onSelected(option.label))}
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body2">
                      {firstCharToUpperCase(option.label)}
                    </Typography>
                  </Stack>
                }
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
