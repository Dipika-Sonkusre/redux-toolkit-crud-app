export const ApiEndpoint = {
  HOME: "/",
  USERS: "/users",
  VIEW_USER: "/users/view/:id",
  EDIT_USER: "/users/edit/:id",
} as const;

export type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];
