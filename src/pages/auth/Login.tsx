import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function Login() {
  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}
