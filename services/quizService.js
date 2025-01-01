import httpConstants from "../constants/http.js";
import Constants from "../constants/constant.js";
import CommonError from "../constants/commonErrors.js";
import Knex from "../db/config.js";
import dotenv from "dotenv";
dotenv.config();
class QuizService {
  constructor() {}

  async create(req, res) {
    try {
      const { title, questions, status } = req?.body;

      const data = { title };
      const [id] = await Knex("quiz").insert(data).returning("id");
      if (Array.isArray(questions) && questions.length > 0) {
        for (const q of questions) {
          const questionData = {
            question: q.question,
            quiz_id: id,
            options: JSON.stringify(q.options),
            correct_option: q.correct_option,
          };
          await Knex("questions").insert(questionData);
        }
      }

      return {
        status: httpConstants?.HTTP_SUCCESS_OK,
        msg: 'Quiz create successfully',
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }],
      };
    }
  }

  async list(req, res) {
    try {
      const orderBy = req?.query?.order || "Desc";
      const orderByColumn = req?.query?.sortBy || "createdAt";
      const page = parseInt(req?.query?.offset) || 1;
      const limit = parseInt(req?.query?.limit) || 10;

      const query = Knex("quiz").where((builder) => {
        builder.where("quiz.deletedAt", null).andWhere("quiz.status", "active");
      });

      query.orderBy(`quiz.${orderByColumn}`, orderBy);
      query.limit(limit).offset((page - 1) * limit);

      let finalResponse = await query.select(
        "quiz.id",
        "quiz.title",
        Knex.raw(`
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          "id", questions.id,
          "question", questions.question,
          "options", questions.options
        )
      )
      FROM questions
      WHERE 
        questions.quiz_id = quiz.id 
        AND questions.deletedAt IS NULL
    ) as questions
  `)
      );

      if (finalResponse.length === 0) {
        return {
          status: httpConstants?.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
          msg: Constants?.massage?.quizNotFound,
          data: finalResponse,
        };
      }
      return {
        status: httpConstants?.HTTP_CREATED,
        msg: Constants?.massage?.successful,
        data: finalResponse,
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }],
      };
    }
  }

  async detail(req, res) {
    try {
      const id = req?.query?.id;

      const query = Knex("quiz")
        .leftJoin("questions", "quiz.id", "questions.quiz_id")
        .where((builder) => {
          builder
            .where("quiz.deletedAt", null)
            .andWhere("quiz.status", "active")
            .andWhere("quiz.id", id);
        });

      let finalResponse = await query
        .select(
          "quiz.id",
          "quiz.title",
          Knex.raw(`
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            "questionId", questions.id,
            "selectedOption", questions.options,
            "question", questions.question
          )
        )
        FROM questions
        WHERE 
          questions.quiz_id = quiz.id 
          AND questions.deletedAt IS NULL
      ) as questions
    `)
        )
        .first();

      if (!finalResponse) {
        return {
          status: httpConstants?.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
          msg: Constants?.massage?.quizNotFound,
          data: {},
        };
      }
      return {
        status: httpConstants?.HTTP_SUCCESS_OK,
        msg: Constants?.massage?.successful,
        data: finalResponse,
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }],
      };
    }
  }

  async answers(req, res) {
    try {
      const { quizId, questionId, selectedOption } = req?.body;
      const userId = req?.user.id;
      const query = Knex("quiz")
        .leftJoin("questions", "quiz.id", "questions.quiz_id")
        .where((builder) => {
          builder
            .where("quiz.deletedAt", null)
            .andWhere("quiz.status", "active")
            .andWhere("quiz.id", quizId)
            .andWhere("questions.id", questionId);
        });

      let questionInfo = await query
        .select(
          "quiz.id",
          "quiz.title",
          "questions.question",
          "questions.options",
          "questions.correct_option"
        )
        .first();

      if (!questionInfo) {
        return res
          .status(404)
          .json({ status: 404, message: "Question not found" });
      }

      const is_correct = questionInfo.correct_option === selectedOption;

      const data = {
        quiz_id: quizId,
        question_id: questionId,
        selected_option: selectedOption,
        user_id: userId,
        is_correct: is_correct,
      };

      await Knex("answer").insert(data);

      const resultQuery = Knex("result").where((builder) => {
        builder
          .where("result.deletedAt", null)
          .andWhere("result.quiz_id", quizId)
          .andWhere("result.user_id", userId);
      });

      let resultInfo = await resultQuery
        .select("result.id", "result.score", "result.answers")
        .first();

      if (!resultInfo) {
        const resultData = {
          quiz_id: quizId,
          user_id: userId,
          score: is_correct ? 1 : 0,
          answers: JSON.stringify([
            {
              question_id: questionId,
              selected_option: selectedOption,
              is_correct: is_correct,
              correct_answer: questionInfo.correct_option,
            },
          ]),
        };
        await Knex("result").insert(resultData);
      } else {
        const updatedScore = is_correct
          ? resultInfo.score + 1
          : resultInfo.score;

        const updatedAnswers = [
          ...resultInfo.answers,
          {
            question_id: questionId,
            selected_option: selectedOption,
            is_correct: is_correct,
            correct_answer: questionInfo.correct_option,
          },
        ];

        const resultData = {
          score: updatedScore,
          answers: JSON.stringify(updatedAnswers),
        };

        await Knex("result")
          .where("id", resultInfo.id)
          .update(resultData);
      }
      if (is_correct) {
        return {
          status: httpConstants?.HTTP_SUCCESS_OK,
          is_correct: true,
          message: "Correct answer!",
        };
      } else {
        return {
          status: httpConstants?.HTTP_SUCCESS_OK,
          is_correct: false,
          message: `Incorrect answer. The correct answer is: ${questionInfo.correct_option}.`,
        };
      }
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }],
      };
    }
  }

  async result(req, res) {
    try {
      const userId = req?.user?.id
      const orderBy = req?.query?.order || "Desc";
      const orderByColumn = req?.query?.sortBy || "createdAt";
      const quizId = req?.query?.quizId;

      const query = Knex("result")
      .leftJoin('users', 'users.id', 'result.user_id')
      .leftJoin('quiz', 'quiz.id', 'result.quiz_id')
      .where((builder) => {
        builder.where("result.deletedAt", null).andWhere('result.user_id',userId);
        if (quizId) {
          builder.andWhere("result.quiz_id", quizId);
        }
      });

      query.orderBy(`result.${orderByColumn}`, orderBy);

      let finalResponse = await query.select(
        "result.id",
        "users.firstName",
        "users.lastName",
        "result.quiz_id",
        "quiz.title",
        "result.score",
        "result.answers as summary"
      );

      if (finalResponse.length === 0) {
        return {
          status: httpConstants?.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
          msg: Constants?.massage?.quizNotFound,
          data: finalResponse,
        };
      }
      return {
        status: httpConstants?.HTTP_CREATED,
        msg: Constants?.massage?.successful,
        data: finalResponse,
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }],
      };
    }
  }
}
const quizService = new QuizService();
export default quizService;
