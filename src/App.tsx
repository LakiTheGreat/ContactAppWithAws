import { Hub } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { CONTACTS_ROUTES } from "routes/paths";
import { useAppDispatch } from "hooks/storeHooks";
import { logInUser, logOutUser } from "storeSlices/userSlice";

import { MotionLazyContainer } from "components/animate";
import Router from "./routes";
import ThemeProvider from "./theme";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const listener = (data: any) => {
    switch (data?.payload?.event) {
      case "signIn":
        dispatch(logInUser(data?.payload.data.attributes));
        navigate(CONTACTS_ROUTES.list);
        break;
      case "autoSignIn":
        dispatch(logInUser(data?.payload.data));
        navigate(CONTACTS_ROUTES.list);
        break;
      case "signOut":
        dispatch(logOutUser());
        break;
    }
  };

  Hub.listen("auth", listener);
  return (
    <ThemeProvider>
      <MotionLazyContainer>
        <Router />
      </MotionLazyContainer>
    </ThemeProvider>
  );
}
