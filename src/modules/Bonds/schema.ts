import * as yup from "yup";

export const createBondValidationSchema = yup
  .object({
    quoteToken: yup.string().required("Bond token is a required field"),
    capacity: yup
      .string()
      .matches(/^[1-9][0-9]*$/, "Only positive non decimal numbers")
      .max(34, "Bond capacity must be at most 34 characters")
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

export const closeBondValidationSchema = yup
  .object({
    id: yup
      .number()
      .typeError("Bond id must be a number")
      .positive()
      .min(1)
      .max(Number.MAX_SAFE_INTEGER)
      .required("Bond id is a required field"),
  })
  .required();
