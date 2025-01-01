import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import knex from "../db/config.js";

dotenv.config();

class AuthMiddleware {
  constructor() {}
  async userVerifyToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(403)
        .json({ status: 403, msg: "Access denied. Token is missing." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
      };

      const userData = await knex
        .select("id", "firstName", "lastName", "email")
        .from("users")
        .where("id", decoded.id)
        .first();
      if (!userData) {
        return res.status(403).json({ status: 403, msg: "User not found." });
      }
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ status: 403, msg: "Token has expired." });
      } else {
        return res.status(403).json({ status: 403, msg: "Invalid token." });
      }
    }
  }
}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;
