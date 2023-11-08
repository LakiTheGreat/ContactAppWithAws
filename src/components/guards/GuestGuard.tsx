import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { CONTACTS_ROUTES } from "routes/paths";
import { useGetCurrentUserQuery } from "api/auth";

type Props = {
  children: ReactNode;
};
export default function GuestGuard({ children }: Props) {
  const location = useLocation();
  const { data, isLoading } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return <></>;
  }
  if (data) {
    return (
      <Navigate to={CONTACTS_ROUTES.all} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}
