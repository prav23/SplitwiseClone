import axios from "axios";

import {
  GET_EXPENSES,
  EXPENSE_LOADING,
  CLEAR_EXPENSES   
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