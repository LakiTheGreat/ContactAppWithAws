// import { useCallback } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Chip from "@mui/material/Chip";
// import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
// import Resizer from "react-image-file-resizer";

import FormProvider from "components/hook-form/FormProvider";

import mockedLabels from "__mocks__/mockedLabels.json";
// import RHFUploadAvatar from "components/hook-form/RHFUpload";
// import { extractExtensions } from "utils/extractExtensions";
import firstCharToUpperCase from "utils/firstCharToUpperCase";
import useResponsive from "hooks/useResponsive";
import { useEffect } from "react";
import { SingeContactFormValues } from "types";

interface Props {
  title: string;
  value?: SingeContactFormValues;
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (data: SingeContactFormValues) => void;
}

export default function ContactForm({
  title,
  value,
  onSubmit,
  isLoading,
  isSuccess,
}: Props) {
  const NewContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Must enter first name"),
    lastName: Yup.string().required("Must enter last name"),
    // image: Yup.string().required("Must add image"),
    email: Yup.string().required("Must add email"),
    phoneNumber: Yup.string().required("Must add phone number"),
  });

  const isDesktop = useResponsive("up", "lg");

  // const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
  //   const file = acceptedFiles[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       new Promise((resolve) => {
  //         Resizer.imageFileResizer(
  //           file,
  //           280,
  //           280,
  //           "JPEG",
  //           90,
  //           0,
  //           (uri: any) => {
  //             setValue("image", uri as string, { shouldDirty: true });
  //             resolve(uri);
  //           },
  //           "base64"
  //         );
  //       });
  //     });
  //     reader.readAsDataURL(file);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const methods = useForm<SingeContactFormValues>({
    resolver: yupResolver(NewContactSchema),
    defaultValues: {
      // image: value?.image || "",
      firstName: value?.firstName || "",
      lastName: value?.lastName || "",
      email: value?.email || "",
      phoneNumber: value?.phoneNumber || "",
      labels: value?.labels || [],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    isSuccess && !value && reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Stack alignItems="center" sx={{ m: 5 }}>
      <Stack gap={3} sx={{ width: isDesktop ? "1152px" : "100%" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="h4">{title}</Typography>
            <FormControl sx={{ width: "240px" }}>
              <InputLabel id="select-label">Labels</InputLabel>
              <Controller
                name="labels"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedValues = field.value
                    ? field.value.map((item) => item)
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
          <Stack gap={2}>
            <Stack direction="row" gap={3}>
              {/* <Card sx={{ mb: 0, py: 3, flex: 1 }}>
                <Stack justifyContent="center" sx={{ height: "100%" }}>
                  <RHFUploadAvatar
                    name="image"
                    accept={extractExtensions()}
                    maxSize={3000000}
                    onDrop={handleDropAvatar}
                  />
                </Stack>
              </Card> */}
              <Stack flex={2}>
                <Stack direction="row" gap={2}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="medium"
                        label={"First name"}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="medium"
                        label={"Last Name"}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </Stack>
                <Stack direction="row" gap={2}>
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
              </Stack>
            </Stack>
            <Stack direction="row" gap={2}>
              <Button
                onClick={() => reset()}
                size="large"
                aria-label="reset"
                variant="outlined"
                sx={{ width: "fit-content" }}
                disabled={!isDirty || isLoading}
              >
                Reset
              </Button>
              <LoadingButton
                loading={isLoading}
                size="large"
                aria-label="submit"
                type="submit"
                variant="contained"
                sx={{ width: "fit-content" }}
              >
                {value ? "Save" : "Create"}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
