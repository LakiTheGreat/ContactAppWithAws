export type SingleContact = {
  _id: string;
  image: string;
  name: string;
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

export type SingeContactFormValues = Omit<SingleContact, "_id">;
