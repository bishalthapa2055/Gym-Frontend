import * as Yup from "yup";

export const form = Yup.object({
  name: Yup.string().min(5).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phonenumber: Yup.string()
    .min(10)
    .max(15)
    .required("Please enter your phone number"),
  emergency_number: Yup.string()
    .min(10)
    .max(15)
    .required("Please enter your emergency number"),
});
