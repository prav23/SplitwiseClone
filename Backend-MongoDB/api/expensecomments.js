const { successResponse, errorResponse } = require("./helper");
const ExpenseComment = require("../models/ExpenseComment");
const kafkaConnection = require('../config/kafka');

const findExpenseCommentsByExpense = async (req, res) => {
    try {
        const expenseId = req.params.expense_id;

        const expenseComments = await ExpenseComment.find({ expense : expenseId });

        if (expenseComments) {
          return successResponse(req, res, { expenseComments });
        } else {
          return errorResponse(
            req,
            res,
            "Unable to find expense comments",
            401
          );
        }
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
};

const consumer = kafkaConnection.getConsumer('quickstart-events3');

consumer.on('message', async function (message) {
  const expenseCommentFields = JSON.parse(message.value);
  const newExpenseComment = await ExpenseComment.create(expenseCommentFields);
});

const createExpenseComment = async (req, res) => {
    try {
      const { description, expense_id, user_id, group_id } = req.body;
      const expenseCommentFields = {};
      expenseCommentFields.user = user_id;
      expenseCommentFields.group = group_id;
      expenseCommentFields.expense = expense_id;
      expenseCommentFields.description = description;
      expenseCommentFields.expense_comment_date = new Date();

      //const newExpenseComment = await ExpenseComment.create(expenseCommentFields);
      const kafka_producer = kafkaConnection.getProducer();
      kafka_producer.send([{
        topic: 'quickstart-events3',
        messages: JSON.stringify(expenseCommentFields)
      }], (dataBack) => {
        console.log("Data sending back: " ,dataBack);
      });

      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

module.exports = {findExpenseCommentsByExpense, createExpenseComment};

