import { useFormContext, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

import UploadAvatar from "../upload/UploadAvatar";
import { UploadProps } from "../upload/type";

interface Props extends Omit<UploadProps, "file"> {
  name: string;
}

export default function RHFUploadAvatar({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        const errorMessage =
          error && error.type === "maxSize"
            ? "photo.errorMessage"
            : error?.message;

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Box>
              <UploadAvatar error={checkError} {...other} file={field.value} />
              {checkError && (
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {errorMessage}
                </FormHelperText>
              )}
            </Box>
          </Box>
        );
      }}
    />
  );
}
