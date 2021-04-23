const sequelize = require ('sequelize');
const Expense = require('../models/expense');

function handle_request(msg, callback) {
  if (msg.path === 'addExpense') {
    
  }
}

exports.handle_request = handle_request;
