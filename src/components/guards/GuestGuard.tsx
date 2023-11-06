import { ReactNode } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import { CONTACTS_ROUTES } from "routes/paths";

type GuestGuardProps = {
  children: ReactNode;
};
export default function GuestGuard({ children }: GuestGuardProps) {
  const { route } = useAuthenticator((context) => [context.route]);

  if (route === "authenticated") {
    return <Navigate to={CONTACTS_ROUTES.all} />;
  }

  return <>{children}</>;
}
