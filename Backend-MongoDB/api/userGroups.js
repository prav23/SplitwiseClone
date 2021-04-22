const { successResponse, errorResponse } = require("./helper");
const UserGroup = require("../models/UserGroup");

const e = require("express");

const deleteUserGroupByGroupIdUserID = async (req, res) => {
  try {
      const group_id = req.params.group_id;
      const user_id = req.params.user_id;

      const userGroup = await UserGroup.findOne({ user : user_id, group : group_id });
      if (userGroup !== null) {
        await UserGroup.deleteOne({ user : user_id, group : group_id });
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
      const group_id = req.params.group_id;
      const userGroups = await UserGroup.findAll({ group : group_id });
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
      const user_id = req.params.user_id;
      const userGroups = await UserGroup.find({ user : user_id });
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
      const group_id = req.params.group_id;
      const user_id = req.params.user_id;

      const userGroup = await UserGroup.findOne({ user : user_id, group : group_id });
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
    const { user_id, group_id, new_friend_user_ids } = req.body;
    // group creation user is registered
    const ugFields = {};
    ugFields.user = user_id;
    ugFields.group = group_id;
    ugFields.status = "Registered";
    ugFields.total_spent = 0;
    ugFields.total_owed = 0;
    
    const newUserGroup = await UserGroup.create(ugFields);
    // group user new friends are invited
    new_friend_user_ids.map(async (nfuid) => {
      const userGroup = await UserGroup.findOne({ user : nfuid, group : group_id});
      if (userGroup) {
        throw new Error("userGroup already exists with same user_id + group_id");
      }
      const payload = {
        user: nfuid,
        group: group_id,
        status: "Invited",
        total_spent : 0,
        total_owed : 0,
      };
      const newUserGroup = await UserGroup.create(payload);
    });
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const acceptUserGroupInvite = async (req, res) => {
  try {
    const { user_id, group_id} = req.body;   
    const userGroup = await UserGroup.findOne({ group : group_id, user : user_id });
    const status = "Registered";
    await userGroup.update({ status });
    return successResponse(req, res, { }, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const settleUserGroup = async (req, res) => {
  try {
    const { source_user_id, target_user_id, userGroupsMap} = req.body;   
    const groupIds = userGroupsMap.map(ug => ug.group_id);
    const userGroups = await UserGroup.find({ group : groupIds, user : [source_user_id, target_user_id] });

    const match_user_group_id = userGroups.map(ug => ({group : ug.group_id, user : ug.user_id}));
    const group_id_user_id_map = {};
    match_user_group_id.map(element => {
      const { group_id, user_id } = element;
      if(group_id_user_id_map[group_id]){
        group_id_user_id_map[group_id].push(user_id);
      }else{
        group_id_user_id_map[group_id] = [user_id];
      }
    })
    const reqGroupId = Object.entries(group_id_user_id_map).filter(([group_id, user_ids]) => user_ids.length == 2)[0][0];
    const sourceUserGroupRow = await UserGroup.findOne({ user : source_user_id, group : reqGroupId });
    let total_owed = sourceUserGroupRow.total_owed;
    total_owed = 0;
    await sourceUserGroupRow.update( { total_owed } )
    
    const targetUserGroupRow = await UserGroup.findOne({ user_id : target_user_id, group_id : reqGroupId });
    let total_owed_target = targetUserGroupRow.total_owed;
    total_owed_target = 0;
    await targetUserGroupRow.update( { total_owed : total_owed_target} )
      
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const addExpenseUserGroup = async (req, res) => {
  try {
    const { user_id, group_id, groupUsersData, amount} = req.body;
    // for all group Users split the expense equally and update the total_owed section
    const friendIds = groupUsersData.map(gu => gu.user_id);
    const friendsCount = friendIds.length;
    let split;
    if(friendsCount)
      split = amount/friendsCount;
    else
      split = 0;
    friendIds.map(async (frId) => {
      const fug = await UserGroup.findOne({ user : frId, group : group_id });
      const fug_tot_owed = fug.total_owed;
      await fug.update( { total_owed : fug_tot_owed - split} )
    });
    const ug = await UserGroup.findOne({
      where: { 
        user_id,
        group_id
      }
    });
    const tot_owed = ug.total_owed;
    await ug.update( { total_owed : tot_owed + split*(friendsCount - 1)} )

    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {deleteUserGroupByGroupIdUserID, createUserGroup, settleUserGroup, addExpenseUserGroup, acceptUserGroupInvite, findUserGroupsByGroupId, findUserGroupsByUserId, findUserGroupByGroupIdUserID};
