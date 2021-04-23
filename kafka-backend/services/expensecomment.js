const sequelize = require ('sequelize');
const ExpenseComment = require('../models/expensecomment');

function handle_request(msg, callback) {
  if (msg.path === 'addExpenseComment') {
    
  }
}

exports.handle_request = handle_request;
