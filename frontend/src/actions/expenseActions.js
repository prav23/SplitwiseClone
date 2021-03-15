import axios from "axios";

import {
  GET_EXPENSES,
  EXPENSE_LOADING,
  CLEAR_EXPENSES,
  GET_ERRORS   
} from "./types";

// Get Expense Details
export const getExpenses =  () => dispatch => {
  dispatch(setExpenseLoading());
  axios
    .get(`http://localhost:3001/api/expenses`)
    .then(res =>
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPENSES,
        payload: {}
      })
    );
};

// Create Expense
export const createExpense = (expenseData, history) => dispatch => {
    axios
      .post("http://localhost:3001/api/expense", expenseData)
      .then(res => history.push("/dashboard"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Dashboard loading
export const setExpenseLoading = () => {
  return {
    type: EXPENSE_LOADING
  };
};

// Clear Dashboard details
export const clearExpenses = () => {
  return {
    type: CLEAR_EXPENSES
  };
};