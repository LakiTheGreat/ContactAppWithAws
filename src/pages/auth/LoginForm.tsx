import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import FormProvider from "components/hook-form/FormProvider";
import LoadingScreen from "components/LoadingScreen";
// import { PATH_AUTH } from 'routes/paths';
// import { useLoginMutation } from 'api/authApi';
// import { useAppDispatch } from 'hooks/hooks';
// import { MAX_USERLOGIN_SIZE } from 'constants/validation';

import { UserFormValues } from "./type";
// import { setCurrentView } from './userSlice';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  // const [login, { isLoading, error }] = useLoginMutation();

  const NewLoginSchema = Yup.object().shape({
    username: Yup.string().required("REQUIRED"),
    password: Yup.string()
      .required("ENTER EMAIL")
      .matches(/^.{4,100}$/, "FORMAT"),
  });

  const methods = useForm<UserFormValues>({
    resolver: yupResolver(NewLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { control, handleSubmit } = methods;

  // const dispatch = useAppDispatch();

  const onSubmit = async (value: UserFormValues) => {
    // try {
    //   const loggedUser = await login(value).unwrap();
    //   dispatch(setCurrentView(loggedUser.user.role.roleView));
    // } catch (error) {
    //   handleLoginError(error as FetchBaseQueryError);
    // }
  };

  // const handleLoginError = (error: FetchBaseQueryError) => {
  //   const errorMessage =
  //     error.status === 401
  //       ? t("email.uncorrect")
  //       : t("notifications.error.serverDescription");
  //   enqueueSnackbar(errorMessage, { variant: "error" });
  // };

  // useEffect(() => {
  //   if (error) {
  //     handleLoginError(error as FetchBaseQueryError);
  //   }
  // }, [error]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label={"Email"}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              label={"Password"}
              error={!!error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0px 0px 15px 11px",
          }}
        >
          <Link>
            <Typography sx={{ color: "primary.main" }} variant="subtitle2">
              {"Forgot password?"}
            </Typography>
          </Link>
        </Box>
        <Button
          aria-label="login"
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          {"Login"}
        </Button>
      </Box>
    </FormProvider>
  );
}
