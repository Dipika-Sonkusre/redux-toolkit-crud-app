import * as yup from "yup";

export const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name cannot be more than 50 characters long"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();
