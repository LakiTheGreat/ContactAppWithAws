import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import FormProvider from "components/hook-form/FormProvider";
import { Controller, useForm } from "react-hook-form";
import { LabelFormValues } from "types";

interface Props {
  title: string;
  isLoading: boolean;
  handleClose: () => void;
  value?: LabelFormValues;
  onSubmit: (data: LabelFormValues) => void;
}

export default function LabelForm({
  title,
  isLoading,
  value,
  handleClose,
  onSubmit,
}: Props) {
  const NewLabelSchema = Yup.object().shape({
    labelName: Yup.string()
      .required("Please enter label name")
      .min(3, "Label must have at least 3 characters")
      .max(15, "Label can't have more than 15 characters"),
  });

  const methods = useForm<LabelFormValues>({
    resolver: yupResolver(NewLabelSchema),
    defaultValues: {
      labelName: value?.labelName || "",
    },
  });

  const { control, handleSubmit } = methods;
  return (
    <Stack gap={2}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="labelName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="medium"
              label={"Label Name"}
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />
        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose} variant="outlined" disabled={isLoading}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            aria-label="submit"
            type="submit"
          >
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
