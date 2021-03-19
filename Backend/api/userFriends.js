const { successResponse, errorResponse } = require("./helper");
const { UserFriends } = require("../models");

const findUserFriendsByUser = async (req, res) => {
  try {
      const user_id = Number(req.params.user_id);
      const userFriends = await UserFriends.findOne({
          where: { user_id : user_id}
      });
      return successResponse(req, res, { userFriends });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const createUserFriends = async (req, res) => {
  try {
    const { user_id, friends_owe_map } = req.body;

    const userFriends = await UserFriends.findOne({
      where: {
        user_id
      },
    });
    if (userFriends) {
      throw new Error("userFriends already exists with same user_id");
    }
    
    const payload = {
      user_id,
      friends_owe_map,
    };
    const newUserFriend = await UserFriends.create(payload);
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const updateUserFriends = async (req, res) => {
  try {
    const { user_id, friends_owe_map } = req.body;
    const userFriends = await UserFriends.findOne({
      where: {
        user_id,
      },
    });
    if(userFriends !== null){
      await userFriends.update({ friends_owe_map });
    }
    else{
      throw new Error("userFriends doesnt exists for given user_id");
    }
    return successResponse(req, res, {}, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const settleFriends = async (req, res) => {
  try {
    const { source_user_id, target_user_id } = req.body;
    
    const sourceUserFriendsRow = await UserFriends.findOne({
      where: {
        user_id : source_user_id
      },
    });
    const targetUserFriendsRow = await UserFriends.findOne({
      where: {
        user_id : target_user_id
      }
    });
    if (targetUserFriendsRow) {
      // update targetUserFriendsMap here
      let friends_owe_map = targetUserFriendsRow.friends_owe_map;
      friends_owe_map[source_user_id] = 0;
      await UserFriends.update(
        { friends_owe_map },
        { where: { user_id: source_user_id } }
      )
    }
    else{
      throw new Error("userFriends row update failed for given target_user_id");
    }
    if (sourceUserFriendsRow) {
      let friends_owe_map = sourceUserFriendsRow.friends_owe_map;
      friends_owe_map[target_user_id] = 0;
      await UserFriends.update(
        { friends_owe_map },
        { where: { user_id: target_user_id } }
      )
      return successResponse(req, res, { friends_owe_map }, 201);
    }
    else{
      throw new Error("userFriends row update failed for given source_user_id");
    }
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const addExpenseUserFriends = async (req, res) => {
  try {
    //const { source_user_id, target_user_id } = req.body;
    const { user_id, group_id, groupUsersData, amount} = req.body;
    console.log(groupUsersData);
    //create friends_owe_map/ update friends_owe_map with the new expense for all users in the group
    // extract user_id's from groupUsersData
    // const userFriendsRows = await UserFriends.findAll({
    // });
    return successResponse(req, res, { }, 201);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {findUserFriendsByUser, createUserFriends, updateUserFriends, settleFriends, addExpenseUserFriends};
