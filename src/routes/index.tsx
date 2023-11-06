import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/mainLayout";
import { Loadable } from "./Loadable";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/", // Use a trailing slash
          element: <Navigate to="contacts/all" replace />,
        },
        {
          path: "contacts/all",
          element: <ContactsList />,
        },
        {
          path: "contacts/favorites",
          element: <ContactsList />,
        },
        {
          path: "contacts/labels/*",
          element: <ContactsList />,
        },
        {
          path: "contacts/new_contact",
          element: <CreateNewContact />,
        },
        {
          path: "contacts/edit_contact/:id",
          element: <EditContact />,
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: "404", element: <>404</> },
    //     { path: "*", element: <Navigate to="/404" replace /> },
    //   ],
    // },
  ]);
}

const ContactsList = Loadable(lazy(() => import("../pages/contactsList")));
const CreateNewContact = Loadable(
  lazy(() => import("../pages/contactsForm/CreateContact"))
);
const EditContact = Loadable(
  lazy(() => import("../pages/contactsForm/EditContact"))
);
