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
      friends_owe_map.set(source_user_id, 0);
      const updatedtargetUserFriend = await targetUserFriendsRow.update( { friends_owe_map } );
    }
    else{
      throw new Error("userFriends row update failed for given target_user_id");
    }
    if (sourceUserFriendsRow) {
      // update sourceUserFriendsMap here
      let friends_owe_map = sourceUserFriendsRow.friends_owe_map;
      friends_owe_map.set(target_user_id, 0);
      const updatedsourceUserFriend = await sourceUserFriendsRow.update( { friends_owe_map } );
      return successResponse(req, res, { updatedsourceUserFriend }, 201);
    }
    else{
      throw new Error("userFriends row update failed for given source_user_id");
    }
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {findUserFriendsByUser, createUserFriends, updateUserFriends, settleFriends};
