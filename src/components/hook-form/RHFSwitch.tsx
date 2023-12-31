import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useFormContext, Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
}

export default function RHFSwitch({ name, label }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} color="primary" checked={field.value} />}
          label={label}
        />
      )}
    />
  );
}
