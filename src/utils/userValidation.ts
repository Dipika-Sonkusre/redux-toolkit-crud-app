import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot be more than 50 characters long"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "Age must be at least 18"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long")
    .max(250, "Address cannot be more than 250 characters long"),
  phone: yup.string().required("Phone number is required"),
});
