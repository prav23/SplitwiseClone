const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { User } = require("../models");

//import { Token, User } from "../../models";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = crypto
      .createHash("md5")
      .update(password || "")
      .digest("hex");
    const matchedUsers = await User.findAll({
      where: { email, hashedPassword: encryptedPassword },
    });
    if (matchedUsers.length === 1) {
      // const user = matchedUsers[0];
      // const newToken = await Token.create({
      //   UserId: user.get("id"),
      // });
      const token = crypto
      .createHash("md5")
      .update(new Date().toDateString())
      .digest("hex");
      return successResponse(req, res, { token }, 201);
    } else {
      return errorResponse(
        req,
        res,
        "Unable to find an user with the given credentials",
        401
      );
    }
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = login;
