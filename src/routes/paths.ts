function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT = "/contacts";

export const CONTACTS_ROUTES = {
  all: path(ROOT, "/all"),
  favorites: path(ROOT, "/favorites"),
  labels: path(ROOT, "/labels"),
  new: path(ROOT, "/new_contact"),
  edit: path(ROOT, "/edit_contact"),
};
