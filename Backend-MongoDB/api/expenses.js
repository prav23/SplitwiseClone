const { successResponse, errorResponse } = require("./helper");
const Expense = require("../models/Expense");
const kafkaConnection = require('../config/kafka');

const findAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.find({});
        if (allExpenses) {
          return successResponse(req, res, { allExpenses });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find an users",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const findExpensesByUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const expense = await Expense.findOne({user : userId});
        if (expense !== null) {
          return successResponse(req, res, { expense });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find expenses by user_id",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const findExpensesByGroup = async (req, res) => {
    try {
        const groupId = req.params.group_id;
        const expense = await Expense.find({ group : groupId });
        if (expense !== null) {
          return successResponse(req, res, { expense });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find expenses by group_id",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const consumer = kafkaConnection.getConsumer('quickstart-events2');

consumer.on('message', async function (message) {
  const expenseFields = JSON.parse(message.value);
  const newExpense = await Expense.create(expenseFields);
});

const createExpense = async (req, res) => {
    try {
      const { amount, description, expense_date, user_id, group_id } = req.body;
      const expenseFields = {};
      expenseFields.user = user_id;
      expenseFields.group = group_id;
      expenseFields.amount = amount;
      expenseFields.description = description;
      expenseFields.expense_date = expense_date;

      //const newExpense = await Expense.create(expenseFields);
      const kafka_producer = kafkaConnection.getProducer();
      kafka_producer.send([{
        topic: 'quickstart-events2',
        messages: JSON.stringify(expenseFields)
      }], (dataBack) => {
        console.log("Data sending back: " ,dataBack);
      });

      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

  const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const expense = await Expense.findOne({_id : id});
        if (expense !== null) {
          await Expense.deleteOne({ _id : id});
          return successResponse(req, res, { });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to delete an expense",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
  };

module.exports = {findAllExpenses, findExpensesByUser, findExpensesByGroup, createExpense, deleteExpense};

