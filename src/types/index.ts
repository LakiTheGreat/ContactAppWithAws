export type SingleContact = {
  userId: string;
  contactId: string;
  // image: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isFavorite: boolean;
  labels: string[];
};

export type UnsavedSingleContact = Omit<SingleContact, "userId" | "contactId">;

export type SingeContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  labels: string[];
};

export type Label = {
  _id: string;
  labelName: string;
};
export type SidebarFilters = {
  favoritesOnly: boolean;
  labels: string[];
};
