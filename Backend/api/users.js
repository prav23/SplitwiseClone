const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { User } = require("../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = crypto
      .createHash("md5")
      .update(password || "")
      .digest("hex");
    const matchedUser = await User.findOne({
      where: { email, hashedPassword: encryptedPassword },
    });
    if (matchedUser !== null) {
      const token = crypto
      .createHash("md5")
      .update(new Date().toDateString())
      .digest("hex");
      
      //const user = matchedUser[0];
      const user_id = matchedUser.get("user_id");
      const name = matchedUser.get("name");
      const storeToken = await matchedUser.update({
        token: token,
      });
      return successResponse(req, res, { token, name, user_id }, 201);
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

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const payload = {
      email,
      name,
      hashedPassword: reqPass,
    };
    const newUser = await User.create(payload);
    return successResponse(req, res, { payload }, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const findAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({
          where: {},
        });
        if (allUsers) {
          return successResponse(req, res, { allUsers });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find an users",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const findUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await User.findOne({
            where: { user_id : id}
        });
        if (user !== null) {
          return successResponse(req, res, { user });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find an users",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

module.exports = {login, register, findAllUsers, findUser};

