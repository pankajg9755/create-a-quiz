import Joi from "joi";
class UserValidationSchema {
  constructor() {}

  static signUp = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9@#]{6,30}$"))
      .required(),
    image: Joi.string().optional().allow(""),
    status: Joi.string()
      .valid("active", "inActive")
      .default("active")
      .optional(),
  });

  static login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
}
export default UserValidationSchema;
