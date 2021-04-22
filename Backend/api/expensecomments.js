const { successResponse, errorResponse } = require("./helper");
const { ExpenseComment } = require("../models");

const findExpenseCommentsByExpense = async (req, res) => {
    try {
        const expenseId = Number(req.params.expense_id);

        const expenseComments = await ExpenseComment.findAll({
            where: { expense_id : expenseId }
        });

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

const createExpenseComment = async (req, res) => {
    try {
      console.log(req.body);
      const { description, expense_id, user_id, group_id } = req.body;
      const payload = {
        description,
        expense_id,
        user_id,
        group_id,
      };
      const newExpenseComment = await ExpenseComment.create(payload);
      return successResponse(req, res, {}, 201);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

module.exports = {findExpenseCommentsByExpense, createExpenseComment};

