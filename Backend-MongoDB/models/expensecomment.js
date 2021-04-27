const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExpenseCommentSchema = new Schema({
  expense: {
    type: Schema.Types.ObjectId,
    ref: 'expenses'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'groups'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  expense_comment_date: {
    type: Date,
    required: true
  }
});

module.exports = ExpenseComment = mongoose.model('expensecomments', ExpenseCommentSchema);
