const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
 
  image: {
    type: String
  },
  phonenumber: {
    type: Number
  },
  currency: {
    type: String
  },
  language: {
    type: String
  },
  timezone: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
