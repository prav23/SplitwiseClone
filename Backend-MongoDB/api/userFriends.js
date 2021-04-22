const { successResponse, errorResponse } = require("./helper");
const UserFriends = require("../models/UserFriends");

const findUserFriendsByUser = async (req, res) => {
  try {
      const user_id = req.params.user_id;
      const userFriends = await UserFriends.findOne({ user : user_id});
      return successResponse(req, res, { userFriends });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const createUserFriends = async (req, res) => {
  try {
    const { user_id, new_friend_user_ids } = req.body;
    const friends_owe_map = {};
    new_friend_user_ids.map(nfuid => friends_owe_map[nfuid] = 0);
    friends_owe_map[user_id] = 0;

    const userFriendsFields = {};
    userFriendsFields.user = user_id;
    userFriendsFields.friends_owe_map = friends_owe_map;
    
    const newUserFriend = await UserFriends.create(userFriendsFields);

    // new friends maps are initialized
    new_friend_user_ids.map(async (nfuid) => {
      const userfriend = await UserFriends.findOne({ user : nfuid });
      if (!userfriend) {
        const new_friends_owe_map = {};
        new_friends_owe_map[user_id] = 0;
        new_friend_user_ids.map(nfid => new_friends_owe_map[nfid] = 0);
        const payload = {
          user : nfuid,
          friends_owe_map : new_friends_owe_map,
        }
        const newUserFriend = await UserFriends.create(payload);
      }
    });
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
    const { user_id, groupUsersData, amount} = req.body;
    //create friends_owe_map/ update friends_owe_map with the new expense for all users in the group
    // extract user_id's from groupUsersData
    let friends_owe_map = {};
    const friendIds = groupUsersData.map(gu => gu.user_id).filter(uids => uids != user_id);
    const friendsCount = friendIds.length;
    console.log(friendsCount);
    let split;
    if(friendsCount)
      split = amount/(friendsCount+1);
    else
      split = 0;
    console.log(split);
    const userFriend = await UserFriends.findOne({
      where: {
        user_id
      },
    });
    if (userFriend) {
      // update userFriends map. split expense and add among friends equally.
      friends_owe_map = userFriend.friends_owe_map;
      friendIds.map(frId => friends_owe_map[frId] = friends_owe_map[frId] + split);
      await UserFriends.update(
        { friends_owe_map },
        { where: { user_id } }
      )
      const userFriends = await UserFriends.findAll({
        where: {
          user_id : friendIds
        }
      });
      userFriends.map(async (uf) => 
        {
          uf.friends_owe_map[user_id] = uf.friends_owe_map[user_id] - split;
          await UserFriends.update(
            { friends_owe_map : uf.friends_owe_map },
            { where: { user_id: uf.user_id } }
          )
        });
    }
    return successResponse(req, res, { }, 201);

  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {findUserFriendsByUser, createUserFriends, updateUserFriends, settleFriends, addExpenseUserFriends};
