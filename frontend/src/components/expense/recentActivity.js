import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses } from '../../actions/expenseActions';
import { Link } from "react-router-dom";
import axios from 'axios';
import ago from 's-ago';

class Expenses extends Component {

  constructor(props){
    super(props);
    this.state = {
      pageSize: 2,
      pageNumber: 0,
      activatedExpense: null,
      expenseComments: [],
      newCommentText: ''
    }
  }

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      //this.props.getDashboardDetails(user.user_id);
      //add getExpense from all groups user is part of code later
      this.props.getExpenses();
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.activatedExpense !== nextState.activatedExpense){
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

    console.log(this.state.pageNumber);

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
    
    let paginatedExpenseList = [];
    if(sortedExpenseList){
      const start = this.state.pageSize * this.state.pageNumber;
      const end = start + this.state.pageSize;
      paginatedExpenseList = sortedExpenseList.slice(start, end);
    }

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
                    {paginatedExpenseList.map(exp => 
                    {
                    return (
                        <div key={ exp.expense_id } className="mb-2 border rounded" onClick={() => this.setState({activatedExpense: exp.expense_id})}>
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                            "{(allUsersList.find(x => x.user_id === exp.user_id)).name}" added "{exp.description}" in Group:: "{(allGroupsList.find(x => x.group_id === exp.group_id)).group_name}"
                            </h5>
                          </div>
                          <p class="mb-1">Expense Amount:: "{exp.amount}" { currency }</p>
                          <small>
                            Expense Date :: { exp.expense_date.toString() }
                          </small>
                          {this.state.activatedExpense === exp.expense_id && (
                            this.state.expenseComments.map(expenseComment => 
                              <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                <div key={ expenseComment.comment_id } className="mb-2 border rounded">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">{(allUsersList.find(x => x.user_id === expenseComment.user_id)).name}</h5>
                                      <h5 className="card-title">{expenseComment.description}</h5>
                                      <p className="card-text">{ago(new Date(expenseComment.createdAt))} </p>
                                    </div>
                                  </div>
                                </div>
                                </div>
                            </div>
                            )
                          )}
                          {this.state.activatedExpense === exp.expense_id && (
                            <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6">
                              <div>
                                <input type="text" class="form-control my-2" onChange={(event) => this.setState({newCommentText: event.target.value})} placeholder="Enter comment" value={this.state.newCommentText}></input>
                                <button type="button" onClick={() => this.submitNewComment(exp.group_id, exp.expense_id, user.user_id)} class="btn btn-primary">Post Comment</button>
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