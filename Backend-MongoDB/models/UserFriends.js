const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserFriendsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  friends_owe_map: {
    type: Map,
  }
});

module.exports = UserFriends = mongoose.model('userfriends', UserFriendsSchema);
