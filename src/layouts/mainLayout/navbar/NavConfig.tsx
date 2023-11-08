import Iconify from "../../../components/Iconify";
import { CONTACTS_ROUTES } from "../../../routes/paths";

export const navConfigFunction = () => {
  const navConfig = [
    {
      subheader: "",
      items: [
        {
          title: "My Contacts",
          path: `${CONTACTS_ROUTES.list}`,
          icon: <Iconify icon={"fluent-mdl2:contact"} />,
        },
        {
          title: "Create new contact",
          path: `${CONTACTS_ROUTES.new}`,
          icon: <Iconify icon={"fluent-mdl2:contact"} />,
        },
      ],
    },
  ];

  return navConfig;
};
