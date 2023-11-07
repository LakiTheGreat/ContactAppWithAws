// components/Login.js
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation, Navigate } from "react-router";
import { CONTACTS_ROUTES } from "routes/paths";

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   if (route === "authenticated") {
  //     console.log(route);
  //     navigate(from);
  //   }
  // }, [route, navigate, from]);

  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
