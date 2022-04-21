import * as yup from "yup";

export const createBondValidationSchema = yup
  .object({
    quoteToken: yup.string().required(),
    capacity: yup
      .number()
      .positive()
      .min(0.01)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    price: yup.number().positive().min(1).max(999999999).required(),
    ending: yup
      .number()
      .positive()
      .min(1)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
  })
  .required();
