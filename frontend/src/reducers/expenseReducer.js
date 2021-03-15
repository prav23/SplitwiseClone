import {
    GET_EXPENSES,
    EXPENSE_LOADING,
    CLEAR_EXPENSES
  } from '../actions/types';
  
  const initialState = {
    expenseDetails: null,
    expenseLoading: false
  };
  
  export default function expenseRed(state = initialState, action) {
    switch (action.type) {
      case EXPENSE_LOADING:
        return {
          ...state,
          expenseLoading: true
        };
      case GET_EXPENSES:
        return {
          ...state,
          expenseDetails: action.payload,
          expenseLoading: false
        };
      case CLEAR_EXPENSES:
        return {
          ...state,
          expenseDetails: null
        };
      default:
        return state;
    }
  }