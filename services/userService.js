import httpConstants from "../constants/http.js";
import Constants from "../constants/constant.js";
import CommonError from "../constants/commonErrors.js";
import Knex from "../db/config.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
class UserService {
  constructor() {}

  async signUp(req, res) {
    try {
      const { firstName, lastName, email, password, image, status } =
        req?.body;
      const checkEmailAlreadyExist = await Knex("users")
        .where("users.deletedAt", null)
        .select("email")
        .where("email", email)
        .first();

      if (checkEmailAlreadyExist) {
        return {
          status: httpConstants?.HTTP_CONFLICT,
          msg: Constants?.massage?.emilAlreadyExist
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        image: image,
        status: status,
      };
      await Knex("users").insert(data);

      return {
        status: httpConstants?.HTTP_SUCCESS_OK,
        msg: Constants?.massage?.registerSuccess
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }]
      };
    }
  }

  async login(req, res) {
    try {
      let data = { email: req.body.email, password: req.body.password };

      const checkEmailAlreadyExist = await Knex("users")
        .select(
          "users.id",
          "users.email",
          "users.password",
          "users.firstName",
          "users.lastName",
        )
        .where("users.email", data.email)
        .andWhere("users.deletedAt", null)
        .first();
      if (!checkEmailAlreadyExist) {
        return {
          status: httpConstants?.HTTP_CONFLICT,
          msg: Constants?.massage?.userAccount
        };
      }
      const passwordMatch = await bcrypt.compare(
        data.password,
        checkEmailAlreadyExist.password
      );
      if (!passwordMatch) {
        return {
          status: httpConstants?.HTTP_PASSWORD_NOMATCH,
          msg: Constants?.massage?.passwordNotMatch
        };
      }
      
      const user = {
        id: checkEmailAlreadyExist.id,
        email: checkEmailAlreadyExist.email,
        firstName: checkEmailAlreadyExist.firstName,
        lastName: checkEmailAlreadyExist.lastName,
      };
      
      const token = await this.generateJwtToken(user);
      delete checkEmailAlreadyExist.password;
      return {
        status: httpConstants?.HTTP_SUCCESS_OK,
        msg: Constants?.massage?.loginSuccessfully,
        token: token,
        userData: checkEmailAlreadyExist
      };
    } catch (error) {
      console.log("error---->", error);
      return {
        status: httpConstants?.HTTP_INTERNAL_SERVER_ERROR,
        errors: [{ msg: CommonError?.SOMETHING_WENT_WRONG }]
      };
    }
  }

  async generateJwtToken(user) {    
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        exp: Math.floor(exp.getTime() / 1000)
      },
      process.env.JWT_SECRET
    );
    return token;
  }

}
const userService = new UserService();
export default userService;
