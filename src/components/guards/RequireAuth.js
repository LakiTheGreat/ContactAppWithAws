import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AUTH_ROUTES } from "routes/paths";

export function RequireAuth({ children }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  if (route !== "authenticated") {
    return (
      <Navigate to={AUTH_ROUTES.login} state={{ from: location }} replace />
    );
  }
  return children;
}
