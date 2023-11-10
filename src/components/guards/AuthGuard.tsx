import { useLocation, Navigate } from "react-router-dom";
import { ReactNode } from "react";

import { AUTH_ROUTES } from "routes/paths";
import { useGetCurrentUserQuery } from "api/auth";
import DashboardLayout from "layouts/mainLayout";
import { useAppSelector } from "hooks/storeHooks";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const location = useLocation();
  const user = useAppSelector((state) => state.user.authUser);
  const { data, isLoading } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return <DashboardLayout />;
  }
  if (!data) {
    return (
      <Navigate to={AUTH_ROUTES.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}
