const { successResponse, errorResponse } = require("./helper");
const { UserGroup } = require("../models");

const deleteUserGroupByGroupIdUserID = async (req, res) => {
  try {
      const group_id = Number(req.params.group_id);
      const user_id = Number(req.params.user_id);

      const userGroup = await UserGroup.findOne({
          where: { 
            user_id : user_id,
            group_id : group_id
          }
      });
      if (userGroup !== null) {
        await UserGroup.destroy({
          where: {
            user_id,
            group_id,
          },
        });
        return successResponse(req, res, { });
      } else {
        return errorResponse(
          req,
          res,
          "Unable to delete an user group",
          401
        );
      }
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const findUserGroupsByGroupId = async (req, res) => {
  try {
      const group_id = Number(req.params.group_id);
      const userGroups = await UserGroup.findAll({
          where: { group_id : group_id}
      });
      if (userGroups !== null) {
        return successResponse(req, res, { userGroups });
      } else {
        return errorResponse(
          req,
          res,
          "Unable to find an user groups",
          401
        );
      }
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const findUserGroupsByUserId = async (req, res) => {
  try {
      const user_id = Number(req.params.user_id);
      const userGroups = await UserGroup.findAll({
          where: { user_id : user_id}
      });
      if (userGroups !== null) {
        return successResponse(req, res, { userGroups });
      } else {
        return errorResponse(
          req,
          res,
          "Unable to find user groups",
          401
        );
      }
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const findUserGroupByGroupIdUserID = async (req, res) => {
  try {
      const group_id = Number(req.params.group_id);
      const user_id = Number(req.params.user_id);

      const userGroup = await UserGroup.findOne({
          where: { 
            user_id : user_id,
            group_id : group_id
          }
      });
      if (userGroup !== null) {
        return successResponse(req, res, { userGroup });
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

const createUserGroup = async (req, res) => {
  try {
    const { user_id, group_id, status } = req.body;

    const userGroup = await UserGroup.findOne({
      where: {
        user_id,
        group_id,
      },
    });
    if (userGroup) {
      throw new Error("userGroup already exists with same user_id + group_id");
    }
    
    const payload = {
      user_id,
      group_id,
      status,
      total_spent : 0,
      total_owed : 0,
    };
    const newUserGroup = await UserGroup.create(payload);
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const updateUserGroup = async (req, res) => {
  try {
    const { user_id, group_id, status, total_owed } = req.body;
    const userGroup = await UserGroup.findOne({
      where: {
        user_id,
        group_id,
      },
    });
    if(userGroup !== null){
      await userGroup.update({ status, total_owed });
    }
    else{
      throw new Error("userGroup doesnt exists for given user_id + group_id");
    }
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {deleteUserGroupByGroupIdUserID, createUserGroup, updateUserGroup, findUserGroupsByGroupId, findUserGroupsByUserId, findUserGroupByGroupIdUserID};
