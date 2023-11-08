import { useCallback } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Resizer from "react-image-file-resizer";

import FormProvider from "components/hook-form/FormProvider";
import { SingeContactFormValues } from "__mocks__/types";
import mockedLabels from "__mocks__/mockedLabels.json";
import RHFUploadAvatar from "components/hook-form/RHFUpload";
import { extractExtensions } from "utils/extractExtensions";
import firstCharToUpperCase from "utils/firstCharToUpperCase";

interface Props {
  title: string;
  value?: SingeContactFormValues;
  onSubmit: (data: SingeContactFormValues) => void;
}

export default function ContactForm({ title, value, onSubmit }: Props) {
  const NewContactSchema = Yup.object().shape({
    name: Yup.string().required("Must enter name"),
    // image: Yup.string().required("Must add image"),
    email: Yup.string().required("Must add email"),
    phoneNumber: Yup.string().required("Must add phone number"),
  });

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            280,
            280,
            "JPEG",
            90,
            0,
            (uri: any) => {
              setValue("image", uri as string, { shouldDirty: true });
              resolve(uri);
            },
            "base64"
          );
        });
      });
      reader.readAsDataURL(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<SingeContactFormValues>({
    resolver: yupResolver(NewContactSchema),
    defaultValues: {
      image: value?.image || "",
      name: value?.name || "",
      email: value?.email || "",
      phoneNumber: value?.phoneNumber || "",
      isFavorite: value?.isFavorite || false,
      labels: value?.labels || [],
    },
  });

  const { control, setValue, handleSubmit, reset } = methods;

  return (
    <Box sx={{ m: 5 }}>
      <Stack gap={3}>
        <Typography variant="h4">{title}</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <Stack direction="row" gap={3}>
              <Card sx={{ mb: 0, py: 3, flex: 1 }}>
                <Stack justifyContent="center" sx={{ height: "100%" }}>
                  <RHFUploadAvatar
                    name="image"
                    accept={extractExtensions()}
                    maxSize={3000000}
                    onDrop={handleDropAvatar}
                  />
                </Stack>
              </Card>
              <Stack flex={2}>
                <Stack>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="medium"
                        label={"Name"}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="medium"
                        label={"Email adress"}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />

                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="medium"
                        label={"Phone number"}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </Stack>
                <FormControl>
                  <InputLabel id="select-label">Labels</InputLabel>
                  <Controller
                    name="labels"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      const selectedValues = field.value
                        ? field.value.map((item) => item._id)
                        : [];

                      const handleChange = (e: any) => {
                        const selectedLabels = mockedLabels.filter((label) =>
                          e.target.value.includes(label._id)
                        );
                        field.onChange(selectedLabels);
                      };

                      return (
                        <Select
                          name="labels"
                          multiple
                          value={selectedValues}
                          onChange={handleChange}
                          label="Labels"
                          variant="outlined"
                          fullWidth
                          error={!!error}
                          renderValue={(selected) => (
                            <div>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={
                                    mockedLabels.find(
                                      (label) => label._id === value
                                    )?.labelName
                                  }
                                />
                              ))}
                            </div>
                          )}
                        >
                          {mockedLabels?.map((label) => (
                            <MenuItem key={label._id} value={label._id}>
                              {firstCharToUpperCase(label.labelName)}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Stack direction="row" gap={2}>
              <Button
                onClick={() => reset()}
                size="large"
                aria-label="cancel"
                variant="outlined"
                sx={{ width: "fit-content" }}
              >
                Cancel
              </Button>
              <Button
                size="large"
                aria-label="submit"
                type="submit"
                variant="contained"
                sx={{ width: "fit-content" }}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Box>
  );
}
