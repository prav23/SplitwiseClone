import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses } from '../../actions/expenseActions';
import { Link } from "react-router-dom";

class Expenses extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      //this.props.getDashboardDetails(user.user_id);
      //add getExpense from all groups user is part of code later
      this.props.getExpenses();
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
    const { expenseDetails, expenseLoading } = this.props.expense;
    const { allGroups, allUsers, profile } = this.props.dashboard;
    let expenseList = [];
    let sortedExpenseList = [];
    let allGroupsList = [];
    let allUsersList = [];
    if(allGroups){
      allGroupsList = allGroups.data.allGroups;
    }
    if(allUsersList){
      allUsersList = allUsers.data.allUsers;
    }
    let currency = "USD";
    if(profile){
      currency = profile.data.currency;
    }
    if(expenseDetails){
      expenseList = expenseDetails.data.allExpenses;
      sortedExpenseList = expenseList.sort(function(a,b){
        return new Date(b.expense_date) - new Date(a.expense_date);
      });
    }
    let recentActivityContent;

    if (expenseLoading) {
        recentActivityContent = (<div>
        <p className="lead text-muted">
        Expenses Loading!!
        </p>        
    </div>);
    } else {
        if(expenseList){
            recentActivityContent = (
                <div class="list-group mt-2">
                    {sortedExpenseList.map(exp => 
                    {
                    return (
                        <div key={ exp.expense_id } className="mb-2 border rounded">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                            "{(allUsersList.find(x => x.user_id === exp.user_id)).name}" added "{exp.description}" in Group:: "{(allGroupsList.find(x => x.group_id === exp.group_id)).group_name}"
                            </h5>
                          </div>
                          <p class="mb-1">Expense Amount:: "{exp.amount}" { currency }</p>
                          <small>
                            Expense Date :: { exp.expense_date.toString() }
                          </small>
                        </div>
                      );
                    }
                )}
                </div>
            );
        }
        else{
            recentActivityContent = (
                <div>
                    <p className="lead text-muted">
                    No recent Expenses
                    </p>
            </div>
            );
        }
    }
    return (
        isAuthenticated && <main class="col-md-2 col-lg-10">
      <div class="align-items-center">
        <h4 class="h2">Recent Expenses</h4>
        { recentActivityContent }
      </div>
    </main>
    );
  }
}

Expenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  expense: state.expense,
  auth: state.auth,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getExpenses })(Expenses);