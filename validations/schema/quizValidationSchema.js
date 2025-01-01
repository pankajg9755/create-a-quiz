import Joi from "joi";
class QuizValidationSchema {
  constructor() {}

  static create = Joi.object({
    title: Joi.string().required(),
    questions: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().required(),
          options: Joi.array().items(Joi.string().required()).required(),
          correct_option: Joi.number().required(),
        })
      )
      .required(),
    status: Joi.string()
      .valid("active", "inActive")
      .default("active")
      .optional(),
  });

  static list = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    offset: Joi.number().integer().min(0).default(0),
    order: Joi.valid("Desc", "Asc").default("Desc").optional(),
    sortBy: Joi.string().optional(),
  });

  static detail = Joi.object({
    id: Joi.number().required(),
  });

  static answers = Joi.object({
    quizId: Joi.number().required(),
    questionId: Joi.number().required(),
    selectedOption: Joi.string()
      .valid("1", "2", "3", "4", "A", "B", "C", "D")
      .required(),
  });

  static result = Joi.object({
    quizId: Joi.number().optional(),
  });
}
export default QuizValidationSchema;
