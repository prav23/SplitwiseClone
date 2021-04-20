const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserGroupSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'groups'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    required: true
  },
  total_spent: {
    type: Number,
    default: 0
  },
  total_owed: {
    type: Number,
    default: 0
  },
});

module.exports = UserGroup = mongoose.model('usergroups', UserGroupSchema);
