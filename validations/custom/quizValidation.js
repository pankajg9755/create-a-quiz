import httpConstants from "../../constants/http.js";
import quizValidationSchema from "../schema/quizValidationSchema.js"
import joiValidator from "../joi/validator.js";

export class QuizValidator {
    constructor() { }

    create(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.body, quizValidationSchema.create,
            );

            if (resData) {
                let response = {
                    isValid: true,
                    status: httpConstants?.HTTP_BAD_REQUEST,
                    data: resData.details[0].message.replace(/"/g, ""),
                    errors: [{ msg: resData.details[0].message.replace(/"/g, "") }],
                };
                return response;
            } else {
                let response = { isValid: false };
                return response;
            }
        } catch {
            return res.json({
                status: httpConstants?.HTTP_BAD_REQUEST,
                message: error.message.replace(/"/g, ""),
            });
        }
    }

    list(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.query, quizValidationSchema.list,
            );

            if (resData) {
                let response = {
                    isValid: true,
                    status: httpConstants?.HTTP_BAD_REQUEST,
                    data: resData.details[0].message.replace(/"/g, ""),
                    errors: [{ msg: resData.details[0].message.replace(/"/g, "") }],
                };
                return response;
            } else {
                let response = { isValid: false };
                return response;
            }
        } catch {
            return res.json({
                status: httpConstants?.HTTP_BAD_REQUEST,
                message: error.message.replace(/"/g, ""),
            });
        }
    }

    detail(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.query, quizValidationSchema.detail,
            );

            if (resData) {
                let response = {
                    isValid: true,
                    status: httpConstants?.HTTP_BAD_REQUEST,
                    data: resData.details[0].message.replace(/"/g, ""),
                    errors: [{ msg: resData.details[0].message.replace(/"/g, "") }],
                };
                return response;
            } else {
                let response = { isValid: false };
                return response;
            }
        } catch {
            return res.json({
                status: httpConstants?.HTTP_BAD_REQUEST,
                message: error.message.replace(/"/g, ""),
            });
        }
    }

    answers(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.body, quizValidationSchema.answers,
            );

            if (resData) {
                let response = {
                    isValid: true,
                    status: httpConstants?.HTTP_BAD_REQUEST,
                    data: resData.details[0].message.replace(/"/g, ""),
                    errors: [{ msg: resData.details[0].message.replace(/"/g, "") }],
                };
                return response;
            } else {
                let response = { isValid: false };
                return response;
            }
        } catch {
            return res.json({
                status: httpConstants?.HTTP_BAD_REQUEST,
                message: error.message.replace(/"/g, ""),
            });
        }
    }

    result(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.query, quizValidationSchema.result,
            );

            if (resData) {
                let response = {
                    isValid: true,
                    status: httpConstants?.HTTP_BAD_REQUEST,
                    data: resData.details[0].message.replace(/"/g, ""),
                    errors: [{ msg: resData.details[0].message.replace(/"/g, "") }],
                };
                return response;
            } else {
                let response = { isValid: false };
                return response;
            }
        } catch {
            return res.json({
                status: httpConstants?.HTTP_BAD_REQUEST,
                message: error.message.replace(/"/g, ""),
            });
        }
    }
}
const quizValidator = new QuizValidator();
export default quizValidator;