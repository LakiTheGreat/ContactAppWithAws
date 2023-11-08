import { Authenticator } from "@aws-amplify/ui-react";
import { Hub } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { CONTACTS_ROUTES } from "routes/paths";

export default function Login() {
  const navigate = useNavigate();

  const listener = (data: any) => {
    switch (data?.payload?.event) {
      case "signIn":
        navigate(CONTACTS_ROUTES.list);
        break;
      case "autoSignIn":
        navigate(CONTACTS_ROUTES.list);
        break;
    }
  };

  Hub.listen("auth", listener);
  return (
    <Stack sx={{ height: "100%" }} justifyContent="center">
      <Authenticator></Authenticator>
    </Stack>
  );
}
