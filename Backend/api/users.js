const { successResponse, errorResponse } = require("./helper");
const { User } = require("../models");

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


module.exports = {findAllUsers, findUser};

