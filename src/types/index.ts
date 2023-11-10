export type SingleContact = {
  _id: string;
  // image: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isFavorite: boolean;
  labels: Label[];
};

export type Label = {
  _id: string;
  labelName: string;
};
export type SidebarFilters = {
  favoritesOnly: boolean;
  labels: string[];
};

export type AuthUser = {
  sub: string;
  email: string;
  email_verified: boolean;
};

export type SingeContactFormValues = Omit<SingleContact, "_id">;
