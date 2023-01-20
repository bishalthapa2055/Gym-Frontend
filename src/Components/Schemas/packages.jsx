import * as Yup from "yup";

export const packagesSchema = Yup.object({
  name: Yup.string().min(5).max(20).required("Please enter packages name"),
  discount_percentage: Yup.number().required(
    "Please enter Discounted percentage"
  ),
  duration_in_days: Yup.number()
    // .min(10)
    // .max(15)
    .required("Please enter Durations"),
  price: Yup.number()
    // .min(10)
    // .max(15)
    .required("Please enter Packages Price"),
});
