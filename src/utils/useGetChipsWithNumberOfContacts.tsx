import { SingleContact } from "types";
import getNotification from "utils/getNotificaton";

interface Props {
  contacts: SingleContact[] | undefined;
}

export default function useGetChipsWithNumberOfContacts({ contacts }: Props) {
  if (contacts) {
    // const numberOfAllContacts: number = contacts.length;
    const numberOfFavoriteContacts: number = contacts.filter(
      (contact) => contact.isFavorite === true
    ).length;

    // const allContacts = getNotification(numberOfAllContacts);
    const favoriteContacts = getNotification(numberOfFavoriteContacts);
    return [favoriteContacts];
  }
  return [<></>, <></>];
}
