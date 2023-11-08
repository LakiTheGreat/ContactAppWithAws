function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT = "/contacts";
const AUTH = "/auth";

export const AUTH_ROUTES = {
  login: path(AUTH, "/login"),
};

export const CONTACTS_ROUTES = {
  list: path(ROOT, "/list"),
  favorites: path(ROOT, "/favorites"),
  labels: path(ROOT, "/labels"),
  new: path(ROOT, "/new_contact"),
  edit: path(ROOT, "/edit_contact"),
};
