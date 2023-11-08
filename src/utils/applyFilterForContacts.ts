import { SidebarFilters } from "__mocks__/types";

export default function applyFilterForContacts(
  contacts: any[],
  filters: SidebarFilters
) {
  const filterByFavorites = contacts.filter((contact) => {
    if (filters.favoritesOnly) {
      return contact.isFavorite === filters.favoritesOnly;
    } else {
      return contact;
    }
  });
  // const filterByProfiles = data.filter((user) => {
  //   if (filters.profiles.length !== 0) {
  //     // use the some() method to check if any profile has a profile_name that matches any of the filterNames
  //     return user.profiles.some((profile) =>
  //       filters.profiles.includes(profile.profile_name)
  //     );
  //   } else {
  //     return user;
  //   }
  // });

  // return filterByProfiles.filter((user) => {
  //   return (
  //     Math.round(user.progressObject.totalProgressPercentage) >= min &&
  //     Math.round(user.progressObject.totalProgressPercentage) <= max
  //   );
  // });

  return filterByFavorites;
}
