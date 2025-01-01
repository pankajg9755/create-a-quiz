import userValidator from "../validations/custom/userValidator.js";
import httpConstants from "../constants/http.js";
import userService from "../services/userService.js";
import CommonError from "../constants/commonErrors.js";

class UserController {
    constructor() { }
    async signUp(req, res) {
        try {
            let validation = userValidator.signUp(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await userService.signUp(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }

    async login(req, res) {
        try {
            let validation = userValidator.login(req, res);
            if (validation.isValid) {
                return res.json({ status: validation.status, msg: validation.errors[0].msg });
            }
            const response = await userService.login(req, res);
            return res.json(response);
        } catch (error) {
            return res.json({ status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR, errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }] });
        }
    }


   }
const userController = new UserController();
export default userController;
