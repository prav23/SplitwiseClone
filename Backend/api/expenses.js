const { successResponse, errorResponse } = require("./helper");
const { Expense } = require("../models");
const kafkaConnection = require('../config/kafka');

const findAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.findAll({
          where: {},
        });
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
        const userId = Number(req.params.user_id);
        const expense = await Expense.findAll({
            where: { user_id : userId}
        });
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
        const groupId = Number(req.params.group_id);
        const expense = await Expense.findAll({
            where: { group_id : groupId}
        });
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
  const payload = JSON.parse(message.value);
  const newExpense = await Expense.create(payload);
});

const createExpense = async (req, res) => {
    try {
      console.log(req.body);
      const { amount, description, expense_date, user_id, group_id } = req.body;
      const payload = {
        amount,
        description,
        expense_date,
        user_id,
        group_id,
      };
      //const newExpense = await Expense.create(payload);
      const kafka_producer = kafkaConnection.getProducer();
      kafka_producer.send([{
        topic: 'quickstart-events2',
        messages: JSON.stringify(payload)
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
        const id = Number(req.params.id);
        const expense = await Expense.findOne({
            where: { 
              expense_id : id
            }
        });
        if (expense !== null) {
          await Expense.destroy({
            where: {
              expense_id : id
            },
          });
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

