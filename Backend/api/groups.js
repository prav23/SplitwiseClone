// const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { Group } = require("../models");

const findAllGroups = async (req, res) => {
    try {
        const allGroups = await Group.findAll({
          where: {},
        });
        if (allGroups) {
          return successResponse(req, res, { allGroups });
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

module.exports = findAllGroups;

