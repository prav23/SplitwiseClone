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
    let expenseList = [];
    if(expenseDetails){
      expenseList = expenseDetails.data.allExpenses;
    }
    console.log(expenseList);
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
                    {expenseList.map(exp => 
                    {
                    return (
                        <div key={ exp.expense_id } className="mb-2 border rounded">
                          <div class="d-flex w-100 justify-content-between">
                            {/* <img
                              class="img-thumbnail"
                              style={{ height: "36px" }}
                              src={countryInfo.flag}
                            ></img> */}
                            <h5 class="mb-1">
                              {user.name} added "{exp.description}" in Group X
                            </h5>
                          </div>
                          <p class="mb-1">Expense Amount {exp.amount}</p>
                          <small>
                            Date : { exp.expense_date }
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
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense,
  auth: state.auth
});

export default connect(mapStateToProps, { getExpenses })(Expenses);