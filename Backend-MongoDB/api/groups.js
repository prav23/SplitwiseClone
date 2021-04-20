const { successResponse, errorResponse } = require("./helper");
//const { Group } = require("../models");
const Group = require("../models/Group");

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

const findGroup = async (req, res) => {
  try {
      const id = Number(req.params.id);
      const group = await Group.findOne({
          where: { group_id : id}
      });
      if (group !== null) {
        return successResponse(req, res, { group });
      } else {
        return errorResponse(
          req,
          res,
          "Unable to find a group",
          401
        );
      }
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const createGroup = async (req, res) => {
  try {
    const { group_name, group_image, new_friend_user_ids } = req.body;
    // update userGroup and userfriends table with new friends here.
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
    
    return successResponse(req, res, { newGroup }, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const updateGroup = async (req, res) => {
  try {
    const { group_id, group_name, group_image } = req.body;
    const group = await Group.findOne({
      where: {
        group_id,
      },
    });
    if(group !== null){
      await group.update({ group_name, group_image });
    }
    else{
      throw new Error("Group doesnt exist");
    }
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {findAllGroups, findGroup, createGroup, updateGroup};

