import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import { AUTH_ROUTES } from "routes/paths";
import { Auth } from "aws-amplify";
import useGetAuthenticatedUser from "hooks/useGetAuthenticatedUser";

type Props = {
  children: ReactNode;
};

// RequireAuth.js

export default function AuthGuard({ children }: Props) {
  const location = useLocation();

  const { data, isLoading, error } = useGetAuthenticatedUser();
  console.log(data);
  console.log(isLoading);
  console.log(error);
  console.log("-----------------------------------------");
  if (isLoading && !data) {
    return <>SPINER</>;
  }
  if (!data && !isLoading) {
    return (
      <Navigate to={AUTH_ROUTES.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}
