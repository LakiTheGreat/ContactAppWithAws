export type SingleContact = {
  userId: string;
  contactId: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isFavorite: boolean;
  labels: string[];
};

export type SingleContactWithImageKey = SingleContact & {
  imageKey: string;
};

export type UnsavedSingleContact = Omit<SingleContact, "userId" | "contactId">;

export type SingeContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  labels: string[];
  image: string;
  imageKey: string;
  imageForUpload?: File;
};
export type LabelFormValues = {
  labelName: string;
};

export type Label = {
  userId: string;
  labelId: string;
  labelName: string;
};
export type SidebarFilters = {
  favoritesOnly: boolean;
  arrayOfLabelIds: string[];
};

export type MatchedLabel = {
  labelName: string;
  labelId: string;
  count: number;
};
