import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroupExpenses } from '../../actions/expenseActions';
import { Link } from "react-router-dom";

class GroupExpenses extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      //this.props.getDashboardDetails(user.user_id);
      //add getExpense by group_id. code later
      this.props.getgroupExpenses();
    }
  }

  render() {

    const { user } = this.props.auth;
    const { groupExpenseDetails, groupExpenseLoading } = this.props.expense;
    let groupExpenseList = [];
    if(groupExpenseDetails){
        groupExpenseList = groupExpenseDetails.data.allExpenses;
    }
    console.log(groupExpenseList);
    let groupActivityContent;

    if (groupExpenseLoading) {
        groupActivityContent = (<div>
        <p className="lead text-muted">
        Group Expenses Loading!!
        </p>        
    </div>);
    } else {
        if(groupExpenseList){
            groupActivityContent = (
                <div>
                    <p className="lead text-muted">
                    Group Expenses
                    </p>
                    <p className="lead text-muted">
                    {groupExpenseList.map(exp => <div>{exp.description} {exp.amount}  {exp.expense_date}  {exp.user_id}</div>)}
                    </p>
            </div>
            );
        }
        else{
            groupActivityContent = (
                <div>
                    <p className="lead text-muted">
                    No recent Expenses
                    </p>
                    <p className="lead text-muted">
                    {groupExpenseList.map(exp => <div>{exp.description}</div>)}
                    </p>
            </div>
            );
        }
    }
    return (
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="align-items-center">
        <h4 class="h2">Expenses List: Hello {user.name} ..!!</h4>
        { groupActivityContent }
      </div>
    </main>
    );
  }
}

GroupExpenses.propTypes = {
  getGroupExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  groupexpense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupexpense: state.expense,
  auth: state.auth
});

export default connect(mapStateToProps, { getGroupExpenses })(GroupExpenses);