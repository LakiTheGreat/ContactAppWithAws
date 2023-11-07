import { ReactNode } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import { CONTACTS_ROUTES } from "routes/paths";

type Props = {
  children: ReactNode;
};
export default function GuestGuard({ children }: Props) {
  const { route } = useAuthenticator((context) => [context.route]);

  if (route === "authenticated") {
    return <Navigate to={CONTACTS_ROUTES.all} />;
  }

  return <>{children}</>;
}
