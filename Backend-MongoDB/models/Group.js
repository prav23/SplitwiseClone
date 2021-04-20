const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  group_image: {
    type: String,
    required: true
  },
});

module.exports = Group = mongoose.model('groups', GroupSchema);
