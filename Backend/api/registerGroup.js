const crypto = require("crypto");
const { successResponse, errorResponse } = require("./helper");
const { Group } = require("../models");

const registerGroup = async (req, res) => {
    try {
      const { group_name, group_image } = req.body;
      //const group_name = req.query.group_name;
      //const group_image = req.query.group_image;
  
      const group = await Group.findOne({
        where: {
          group_name,
        },
      });
      if (group) {
        throw new Error("Group already exists with same name");
      }
      const payload = {
        group_name,
        group_image,
      };
      const newGroup = await Group.create(payload);
      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };
  
  module.exports = registerGroup;