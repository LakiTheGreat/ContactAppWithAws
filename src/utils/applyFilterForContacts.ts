import { SidebarFilters, SingleContact } from "types";

export default function applyFilterForContacts(
  contacts: SingleContact[],
  filters: SidebarFilters
) {
  const filterByFavorites = contacts.filter((contact) => {
    if (filters.favoritesOnly) {
      return contact.isFavorite === filters.favoritesOnly;
    } else {
      return contact;
    }
  });

  const filterByLabels = filterByFavorites.filter((contact) => {
    if (filters.arrayOfLabelIds.length !== 0) {
      // use the some() method to check if any profile has a profile_name that matches any of the filterNames
      return contact.labels.some((labelId) =>
        filters.arrayOfLabelIds.includes(labelId)
      );
    } else {
      return contact;
    }
  });

  // return filterByProfiles.filter((user) => {
  //   return (
  //     Math.round(user.progressObject.totalProgressPercentage) >= min &&
  //     Math.round(user.progressObject.totalProgressPercentage) <= max
  //   );
  // });

  return filterByLabels;
}
