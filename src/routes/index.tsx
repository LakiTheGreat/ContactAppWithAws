import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/mainLayout";
import { Loadable } from "./Loadable";
import { RequireAuth } from "components/guards/RequireAuth";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          children: [{ path: "*", element: <Navigate to="login" replace /> }],
        },
      ],
    },
    {
      path: "contacts",
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "all",
          element: <ContactsList />,
        },
        {
          path: "favorites",
          element: <ContactsList />,
        },
        {
          path: "labels/*",
          element: <ContactsList />,
        },
        {
          path: "new_contact",
          element: <CreateNewContact />,
        },
        {
          path: "edit_contact/:id",
          element: <EditContact />,
        },
      ],
    },
    {
      // Set the default route when the app is opened
      index: true,
      element: <Navigate to="auth/login" replace />,
    },
    {
      path: "*",
      element: <>NEMA DALJE</>,
    },
  ]);
}
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const ContactsList = Loadable(lazy(() => import("../pages/contactsList")));
const CreateNewContact = Loadable(
  lazy(() => import("../pages/contactsForm/CreateContact"))
);
const EditContact = Loadable(
  lazy(() => import("../pages/contactsForm/EditContact"))
);
