// const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { UserGroup } = require("../models");

const findAllUserGroups = async (req, res) => {
    try {
        const allUserGroups = await UserGroup.findAll({
          where: {},
        });
        if (allUserGroups) {
          return successResponse(req, res, { allUserGroups });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find groups",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

module.exports = findAllUserGroups;

