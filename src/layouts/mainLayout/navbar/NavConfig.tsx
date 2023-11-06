import { Label } from "__mocks__/types";
import Iconify from "../../../components/Iconify";
import { CONTACTS_ROUTES } from "../../../routes/paths";
import useGetNotificationContent from "./useGetNotificationContent";
import mockedLabels from "__mocks__/mockedLabels.json";
import useGetLabelCount from "hooks/useGetLabelCount";
import firstCharToUpperCase from "utils/firstCharToUpperCase";

export const navConfigFunction = () => {
  const labels: Label[] = mockedLabels;
  const [numberOfAllContacts, numberOfFavoriteContacts] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetNotificationContent();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const numberOfLabelContactsPerLabel = useGetLabelCount();

  const labelItems = labels.map((label) => {
    let info = <></>;
    const matchedLabel = numberOfLabelContactsPerLabel.find(
      (item) => item.label === label.labelName
    );
    if (matchedLabel) {
      info = matchedLabel.component;
    }
    return {
      title: firstCharToUpperCase(label.labelName),
      path: `${CONTACTS_ROUTES.labels}/${label.labelName}`.toLocaleLowerCase(),
      icon: <Iconify icon={"material-symbols:bookmark-outline"} />,
      info: info,
    };
  });

  const navConfig = [
    {
      subheader: "",
      items: [
        {
          title: "All",
          path: `${CONTACTS_ROUTES.all}`,
          icon: <Iconify icon={"fluent-mdl2:contact"} />,
          info: numberOfAllContacts,
        },
        {
          title: "Favorites",
          path: `${CONTACTS_ROUTES.favorites}`,
          icon: <Iconify icon={"ic:baseline-star"} />,
          info: numberOfFavoriteContacts,
        },
      ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: "Labels",
      items: [...labelItems],
    },
  ];

  return navConfig;
};
