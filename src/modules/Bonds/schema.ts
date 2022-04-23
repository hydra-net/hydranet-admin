import * as yup from "yup";

export const createBondValidationSchema = yup
  .object({
    quoteToken: yup.string().required("Bond token is a required field"),
    capacity: yup
      .number()
      .typeError("Bond capacity must be a number")
      .positive()
      .min(0.01)
      .max(Number.MAX_SAFE_INTEGER)
      .required("Bond capacity is a required field"),
    price: yup
      .number()
      .typeError("Bond price must be a number")
      .positive()
      .min(1)
      .max(999999999)
      .required("Bond price is a required field"),
    ending: yup
      .number()
      .typeError("Bond ending days must be a number")
      .positive()
      .min(1)
      .max(Number.MAX_SAFE_INTEGER)
      .required("Bond ending days is a required field"),
  })
  .required();
