import quizValidator from "../validations/custom/quizValidation.js";
import httpConstants from "../constants/http.js";
import quizService from "../services/quizService.js";
import CommonError from "../constants/commonErrors.js";

class QuizController {
    constructor() { }
    async create(req, res) {
        try {
            let validation = quizValidator.create(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await quizService.create(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

    async list(req, res) {
        try {
            let validation = quizValidator.list(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await quizService.list(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

    async detail(req, res) {
        try {
            let validation = quizValidator.detail(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await quizService.detail(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

    async answers(req, res) {
        try {
            let validation = quizValidator.answers(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await quizService.answers(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

    async result(req, res) {
        try {
            let validation = quizValidator.result(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await quizService.result(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

   }
const quizController = new QuizController();
export default quizController;
