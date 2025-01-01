import httpConstants from "../../constants/http.js";
import userValidationSchema from "../schema/userValidationSchema.js"
import joiValidator from "../joi/validator.js";

export class UserValidator {
    constructor() { }

    signUp(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.body, userValidationSchema.signUp,
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

    login(req) {
        try {

            let resData = joiValidator.joiValidation(
                req.body, userValidationSchema.login,
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
const userValidator = new UserValidator();
export default userValidator;