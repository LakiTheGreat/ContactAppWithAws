// components/Login.js
import { useEffect } from "react";
import { Hub } from "aws-amplify";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { useNavigate, useLocation } from "react-router";
import { useAppSelector } from "hooks/storeHooks";

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const user = useAppSelector((state) => state.user);
  console.log(user);
  const listener = (data: any) => {
    switch (data?.payload?.event) {
      case "signIn":
        console.log("user signed in");
        break;
      case "autoSignIn":
        console.log("auto sign in successful");
        break;
      default:
        console.log("unknown event type");
        break;
    }
  };

  Hub.listen("auth", listener);

  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
