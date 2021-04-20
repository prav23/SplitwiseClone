const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExpenseSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'groups'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expense_date: {
    type: Date,
    required: true
  }
});

module.exports = Expense = mongoose.model('expenses', ExpenseSchema);
