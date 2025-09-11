export const ApiEndpoint = {
  HOME: "/",
  ADD_USER: "/add-user",
} as const;

export type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];
