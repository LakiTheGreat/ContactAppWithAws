import { Authenticator } from "@aws-amplify/ui-react";
import { Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Stack from "@mui/material/Stack";

export default function Login() {
  return (
    <Stack sx={{ height: "100%" }} justifyContent="center">
      <Authenticator></Authenticator>
    </Stack>
  );
}
