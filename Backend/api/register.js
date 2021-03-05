const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { User } = require("../models");

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
      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };
  
  module.exports = register;