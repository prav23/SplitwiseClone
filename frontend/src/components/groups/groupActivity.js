import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses, createExpense } from '../../actions/expenseActions';
import { getGroupUsersDetails } from '../../actions/groupActivityActions';
import SelectListGroup from '../common/SelectListGroup';
import { Link } from "react-router-dom";

import TextFieldGroup from '../common/TextFieldGroup';

class GroupExpenses extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if(isAuthenticated){
      this.props.getExpenses();
      const group_id = Number(this.props.match.params.groupId);
      this.props.getGroupUsersDetails(group_id);
    }
  }
  constructor(props) {
    super(props);
    
    this.state = {
      amount:'',
      description: '',
      expense_date: '',
      user_id: '',
      group_id: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const jquery = window.$;
    jquery("#exampleModal").modal("hide");
    const expenseData = {
      amount: this.state.amount,
      description: this.state.description,
      expense_date: this.state.expense_date,
      user_id: Number(this.state.user_id),
      group_id: Number(this.props.match.params.groupId),
      groupUsersData: this.props.groupActivity.groupUsersDetails.data.userGroups,
      errors: {}
    };
    
    this.props.createExpense(expenseData, this.props.history);
    //this.props.getExpenses();
    const ln = this.props.getExpenses;
    setTimeout(() => ln(), 2000);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { expenseDetails, expenseLoading } = this.props.expense;
    const { allUsers, allGroups, profile } = this.props.dashboard;
    const { errors } = this.state;
    const history = this.props.history;
    let currency = "USD";
    if(profile){
      currency = profile.data.currency;
    }
    let allUsersList = [];
    let allUserOptions = [];
    if(allUsers.data){
      allUsersList = allUsers.data.allUsers;
      allUserOptions.push({ label: '* Select Friend', value: '' });
      allUsersList.map(su => allUserOptions.push({label: su.name, value: su.user_id}));
    }

    let allGroupsList = [];
    if(allGroups){
      allGroupsList = allGroups.data.allGroups;
    }
    let groupExpenseList = [];
    let sortedgroupExpenseList =[];
    if(expenseDetails){
        let allExpensesList = expenseDetails.data.allExpenses;
        groupExpenseList = allExpensesList.filter(x => x.group_id === Number(this.props.match.params.groupId));
        sortedgroupExpenseList = groupExpenseList.sort(function(a,b){
          return new Date(b.expense_date) - new Date(a.expense_date);
        });
    }
    //console.log(groupExpenseList);
    let groupActivityContent;
  
    if (expenseLoading) {
        groupActivityContent = (<div>
        <p className="lead text-muted">
        Group Expenses Loading!!
        </p>        
    </div>);
    } else {
        if(sortedgroupExpenseList){
            groupActivityContent = (
              <div class="list-group mt-2">
                {sortedgroupExpenseList.map(exp => 
                {
                return (
                    <div key={ exp.expense_id } className="mb-2 border rounded">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        "{(allUsersList.find(x => x.user_id === exp.user_id)).name}" added "{exp.description}"
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
            groupActivityContent = (
                <div>
                    <p className="lead text-muted">
                    No recent Expenses
                    </p>
            </div>
            );
        }
    }
    return (
    <main class="col-md-2 col-lg-10">
      <div className="container">
        <div className= "row mt-2 border-bottom">
          <img style = {{width:"100px",height:"100px"}} src={(allGroupsList.find(x => x.group_id === Number(this.props.match.params.groupId))).group_image} class="img-thumbnail" alt="..."/>  
          <div class = "col">
            <h5>Group: { (allGroupsList.find(x => x.group_id === Number(this.props.match.params.groupId))).group_name} </h5>
          </div>
        <div class = "col-6">
          <button className="btn btn-primary btn-block mt-2 mb-2" onClick = {e => history.push(`/editgroup/${Number(this.props.match.params.groupId)}`)}> Edit Group Info</button>
        </div>
        <div class = "col">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Expense
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add Expense</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="create-expense">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5 m-auto">
                          <h4 className="display-8 text-center">Add Expense</h4>
                          
                          <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                              placeholder="Expense Amount"
                              name="amount"
                              value={this.state.amount}
                              onChange={this.onChange}
                              error={errors.amount}
                              info="Enter expense amount"
                            />
                            <TextFieldGroup
                              placeholder="description"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              error={errors.description}
                              info="Please enter description"
                            />
                            <TextFieldGroup
                              placeholder="enter expense date"
                              name="expense_date"
                              type="date"
                              value={this.state.expense_date}
                              onChange={this.onChange}
                              error={errors.expense_date}
                              info="Please enter expense_date"
                            />
                            <SelectListGroup
                              placeholder="user_id"
                              name="user_id"
                              value={this.state.user_id}
                              onChange={this.onChange}
                              options={allUserOptions}
                              error={errors.user_id}
                              info="Please Select Expense User"
                            />
                            <input
                              type="submit"
                              value="Add Expense"
                              className="btn btn-info btn-block mt-4"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          { groupActivityContent }
      </div>
    </main>
    );
  }
}

GroupExpenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  expense: state.expense,
  auth: state.auth,
  errors: state.errors,
  dashboard: state.dashboard,
  groupActivity: state.groupActivity,
});

export default connect(mapStateToProps, { getExpenses, createExpense, getGroupUsersDetails})(GroupExpenses);