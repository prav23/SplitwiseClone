import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses, createExpense } from '../../actions/expenseActions';
import { getGroupUsersDetails } from '../../actions/groupActivityActions';
import SelectListGroup from '../common/SelectListGroup';
import { Link } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';
import ago from 's-ago';

class GroupExpenses extends Component {

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if(isAuthenticated){
      this.props.getExpenses();
      const group_id = this.props.match.params.groupId;
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
      errors: {},
      pageSize: 2,
      pageNumber: 0,
      activatedExpense: null,
      expenseComments: [],
      newCommentText: ''
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
      user_id: this.state.user_id,
      group_id: this.props.match.params.groupId,
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

  componentWillUpdate(nextProps, nextState){
    if(this.state.activatedExpense !== nextState.activatedExpense && nextState.activatedExpense !== null){
      axios.get(`http://localhost:3001/api/expensecomments/${nextState.activatedExpense}`).then(response => {
        this.setState({expenseComments: response.data.data.expenseComments});
      })
    }
  }


  handlePageSizeChange(newPageSize) {
    this.setState({pageSize: newPageSize, pageNumber: 0})
  }

  handlePageNumberChange(expenseDetails, isForward){
    if(expenseDetails){
      const expenseList = expenseDetails.data.allExpenses;
      const numberOfPages = (expenseList.length)/(this.state.pageSize);
      if(isForward){
        if(this.state.pageNumber < numberOfPages - 1){
          this.setState({pageNumber: this.state.pageNumber + 1})
        }
      } else {
        if(this.state.pageNumber > 0){
          this.setState({pageNumber: this.state.pageNumber - 1})
        }
      }
    }
  }

  submitNewComment(group_id, expense_id, user_id){
    console.log(expense_id);
    console.log(user_id);
    axios.post('http://localhost:3001/api/expensecomments', {
      group_id,
      user_id,
      expense_id,
      description: this.state.newCommentText
    }).then(response => {
      this.setState({newCommentText: ''})
      const oldExpenseId = this.state.activatedExpense;
      this.setState({activatedExpense: null}, () =>{
        this.setState({activatedExpense: oldExpenseId});
      })
    })
  }

  render() {
    const { user } = this.props.auth;
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
      allUsersList.map(su => allUserOptions.push({label: su.name, value: su._id}));
    }

    let allGroupsList = [];
    if(allGroups){
      allGroupsList = allGroups.data.allGroups;
    }
    let groupExpenseList = [];
    let sortedgroupExpenseList =[];
    let paginatedExpenseList = [];
    if(expenseDetails){
        let allExpensesList = expenseDetails.data.allExpenses;
        groupExpenseList = allExpensesList.filter(x => x.group === this.props.match.params.groupId);
        sortedgroupExpenseList = groupExpenseList.sort(function(a,b){
          return new Date(b.expense_date) - new Date(a.expense_date);
        });
    }
    //console.log(groupExpenseList);
    let groupActivityContent;
    
    if(sortedgroupExpenseList){
      const start = this.state.pageSize * this.state.pageNumber;
      const end = start + this.state.pageSize;
      paginatedExpenseList = sortedgroupExpenseList.slice(start, end);
    }

    if (expenseLoading) {
        groupActivityContent = (<div>
        <p className="lead text-muted">
        Group Expenses Loading!!
        </p>        
    </div>);
    } else {
        if(paginatedExpenseList){
            groupActivityContent = (
              <div class="list-group mt-2">
                {paginatedExpenseList.map(exp => 
                {
                return (
                    <div key={ exp._id } className="mb-2 border rounded" onClick={() => this.setState({activatedExpense: exp._id})}>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                        "{(allUsersList.find(x => x._id === exp.user)).name}" added "{exp.description}"
                        </h5>
                      </div>
                      <p class="mb-1">Expense Amount:: "{exp.amount}" { currency }</p>
                      <small>
                        Expense Date :: { exp.expense_date.toString() }
                      </small>
                      {this.state.activatedExpense === exp._id && (
                            this.state.expenseComments.map(expenseComment => 
                              <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                <div key={ expenseComment._id } className="mb-2 border rounded">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">{(allUsersList.find(x => x._id === expenseComment.user)).name} </h5>
                                      <h5 className="card-title">{expenseComment.description}</h5>
                                      <p className="card-text">{ago(new Date(expenseComment.expense_comment_date))} </p>
                                      <i class="bi bi-trash"></i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                      </svg>
                                      <i class="bi bi-trash"> Delete Comment</i>
                                    </div>
                                  </div>
                                </div>
                                </div>
                            </div>
                            )
                          )}
                          {this.state.activatedExpense === exp._id && (
                            <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6">
                              <div>
                                <input type="text" class="form-control my-2" onChange={(event) => this.setState({newCommentText: event.target.value})} placeholder="Enter comment" value={this.state.newCommentText}></input>
                                <button type="button" onClick={() => this.submitNewComment(exp.group, exp._id, user.user_id)} class="btn btn-primary">Post Comment</button>
                              </div>
                            </div>
                            </div>
                          )}
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
          <img style = {{width:"100px",height:"100px"}} src={(allGroupsList.find(x => x._id === this.props.match.params.groupId)).group_image} class="img-thumbnail" alt="..."/>  
          <div class = "col">
            <h5>Group: { (allGroupsList.find(x => x._id === this.props.match.params.groupId)).group_name} </h5>
          </div>
        <div class = "col-6">
          <button className="btn btn-primary btn-block mt-2 mb-2" onClick = {e => history.push(`/editgroup/${this.props.match.params.groupId}`)}> Edit Group Info</button>
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

          {/* { groupActivityContent } */}
      </div>
      <div class="align-items-center">
        <h4 class="h4">Group Recent Expenses</h4>
        <div className="row align-items-center">
        <div className="col"></div>
        <div className="col-1">
        <button onClick={() => this.handlePageNumberChange(expenseDetails, false)}> &laquo;</button>
          </div>
                <form className="col-2">
          <div class="form-row">
            <select class="form-control" value={this.state.pageSize} onChange={(event) => this.handlePageSizeChange(event.target.value)}>
              <option>2</option>
              <option>5</option>
              <option>10</option>
            </select>
          </div>
          </form>
          <div className="col-1">
            <button onClick={() => this.handlePageNumberChange(expenseDetails, true)}> &raquo;</button>
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