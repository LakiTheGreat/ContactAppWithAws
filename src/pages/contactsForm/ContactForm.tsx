import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import Skeleton from "@mui/material/Skeleton";
import Resizer from "react-image-file-resizer";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

import FormProvider from "components/hook-form/FormProvider";
import useResponsive from "hooks/useResponsive";
import { useCallback, useEffect, useState } from "react";
import { Label, SingeContactFormValues } from "types";
import RHFUploadAvatar from "components/hook-form/RHFUploadAvatar";
import { extractExtensions } from "utils/extractExtensions";
import RHFUploadCaption from "components/hook-form/RHFUploadCaption";
import useConfirmDialog from "hooks/useConfirmDialog";
import { useDeleteImageFromS3Mutation } from "api/contacts";

interface Props {
  title: string;
  value?: SingeContactFormValues;
  isLoading: boolean;
  labelDataIsLoading: boolean;
  isSuccess: boolean;
  onSubmit: (data: SingeContactFormValues) => void;
  labelObjects: Label[];
}

export default function ContactForm({
  title,
  value,
  onSubmit,
  isLoading,
  labelDataIsLoading,
  isSuccess,
  labelObjects,
}: Props) {
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [deleteImageFromS3] = useDeleteImageFromS3Mutation();
  const [imageKey, setImageKey] = useState<string>("");

  const NewContactSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Must enter first name")
      .max(50, "Max. characters is 50"),
    lastName: Yup.string()
      .required("Must enter last name")
      .max(50, "Max. characters is 50"),
    email: Yup.string().required("Must add email"),
    phoneNumber: Yup.string()
      .required("Must add phone number")
      .max(30, "Max. characters is 30"),
  });

  const isDesktop = useResponsive("up", "lg");
  const isMobile = useResponsive("down", "sm");

  const handleRemoveImage = async () => {
    const isConfirmed = await getConfirmation({
      title: "Delete image",
      contentText: `This image will be permanently deleted. Contact will be save automatically. Are you sure?`,
      confirmLabel: `Delete`,
    });
    if (isConfirmed) {
      await deleteImageFromS3(imageKey);
      setValue("image", "");
      setValue("imageForUpload", undefined);
      setValue("imageKey", "");

      try {
        await handleSubmit(onSubmit)();
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("imageForUpload", file);
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
            (uri) => {
              setValue("image", uri as string);
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
      firstName: value?.firstName || "",
      lastName: value?.lastName || "",
      email: value?.email || "",
      phoneNumber: value?.phoneNumber || "",
      labels: value?.labels || [],
      image: value?.image || "",
      imageKey: value?.imageKey || "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    isSuccess && !value && reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    value?.imageKey && setImageKey(value?.imageKey);
  }, [value]);

  const image = getValues("image");
  return (
    <Stack alignItems="center" sx={{ p: 5 }}>
      <Stack gap={3} sx={{ width: isDesktop ? "1152px" : "100%" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography variant="h4">{title}</Typography>
            <FormControl sx={{ width: "240px" }}>
              <InputLabel id="select-label">Labels</InputLabel>
              {labelDataIsLoading && (
                <>
                  <Skeleton variant="rounded" width={240} height={56} />
                </>
              )}
              {labelObjects && (
                <Controller
                  name="labels"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    const selectedValues = field.value || [];
                    const handleChange = (e: any) => {
                      field.onChange(e.target.value);
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
                                  labelObjects.find(
                                    (label: Label) => label.labelId === value
                                  )?.labelName
                                }
                              />
                            ))}
                          </div>
                        )}
                      >
                        {!labelObjects.length && (
                          <Typography sx={{ p: 1 }}>
                            You have no labels created. Click on "filter" button
                            in MyContacts to create a new one.
                          </Typography>
                        )}
                        {labelObjects?.map((label: Label) => (
                          <MenuItem key={label.labelId} value={label.labelId}>
                            {label.labelName}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              )}
            </FormControl>
          </Stack>
          <Stack gap={2}>
            <Stack direction="row" gap={3}>
              <Stack flex={2} gap={1}>
                <Stack alignItems="center">
                  <RHFUploadAvatar
                    name="image"
                    accept={extractExtensions()}
                    // maxSize={3000000}
                    onDrop={handleDropAvatar}
                    helperText={<RHFUploadCaption />}
                  />
                  <Box>
                    <IconButton
                      aria-label="remove"
                      disabled={!image}
                      onClick={handleRemoveImage}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
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
                sx={{ width: isMobile ? "100%" : "fit-content" }}
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
                sx={{ width: isMobile ? "100%" : "fit-content" }}
              >
                {value ? "Save" : "Create"}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
        <Confirmation />
      </Stack>
    </Stack>
  );
}
