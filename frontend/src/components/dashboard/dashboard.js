import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDashboardDetails, getUserGroupDetails, getCurrentProfile, getAllGroups, getAllUsers, settleUp } from '../../actions/dashboardActions';
import { Link } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.props.getDashboardDetails(user.user_id);
      this.props.getUserGroupDetails(user.user_id);
      this.props.getCurrentProfile(user.user_id);
      this.props.getAllGroups();
      this.props.getAllUsers();
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      source_user_id:'',
      target_user_id:'',
      amount:'',
      settle_date:'',
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
    
    const settleData = {
      source_user_id: this.state.source_user_id,
      target_user_id: this.state.target_user_id,
      amount: this.state.amount,
      settle_date: this.state.settle_date,
    };
    this.props.settleUp(settleData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { dashboardDetails, userGroupDetails, dashboardloading } = this.props.dashboard;
    let friends_owe_map;
    let userGroupsList = [];
    let dashboardContent;
    let youOweContent;
    let youOwedContent;
    if(dashboardDetails !== null && dashboardDetails.data.userFriends){
      console.log(dashboardDetails);
      friends_owe_map = Object.entries(dashboardDetails.data.userFriends.friends_owe_map);
      console.log(friends_owe_map);
      youOweContent = (
        <div class="col-sm ">
          You Owe
          {friends_owe_map.map( ([key, value]) => {
            if(value > 0)
              return <div> you owe User_ID {key} : ${value} </div>
            else
              return <div></div>
          })}
        </div>
      );
      youOwedContent = (
        <div class="col-sm border-left py-2">
          You are Owed
          {friends_owe_map.map( ([key, value]) => {
            if(value < 0)
              return <div> User_ID {key} owes you : ${-value} </div>
            else
              return <div></div>
          })}
        </div>
      );
    }
    if(userGroupDetails !== null){
      console.log(dashboardDetails);
      userGroupsList = userGroupDetails.data.userGroups;
      console.log(friends_owe_map);
    }
    if (dashboardloading) {
      dashboardContent = (<div>
        <p className="lead text-muted">
        Loading!!
        </p>        
    </div>);
    } else {
        dashboardContent = (
            // <div>
            //     <p className="lead text-muted">
            //     {userGroupsList.map(ug => <div>{ug.user_id} {ug.group_id}  {ug.status} </div>)}
            //     </p>
            // </div>
            <>
          <div class="row">
            <div class="col-sm border-right">
              Total Balance : -2 USD
            </div>
            <div class="col-sm ">
              You Owe : 5 USD
            </div>
            <div class="col-sm border-left py-2">
              You are Owed : 3USD
            </div>
          </div>
          <div class="row">
            { youOweContent }
            { youOwedContent }
          </div>
        </>  
        );
    }
    return (
      isAuthenticated && <div className="dashboard">
        <div className="container">
            <div className= "row mt-2 border-bottom">
              <div class = "col">
                <h3>Dashboard </h3>
              </div>  
              <div class = "col-6">

              </div>
              <div class = "col">
                {/* <button class = "btn btn-primary">Settle Up</button> */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Settle Up
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Settle Up</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div className="settle-up">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-5 m-auto">                                
                                <form onSubmit={this.onSubmit}>
                                  <TextFieldGroup
                                    placeholder="source_user_id"
                                    name="source_user_id"
                                    value={this.state.source_user_id}
                                    onChange={this.onChange}
                                    info="Enter source_user_id"
                                  />
                                  <TextFieldGroup
                                    placeholder="target_user_id"
                                    name="target_user_id"
                                    value={this.state.target_user_id}
                                    onChange={this.onChange}
                                    info="Please enter target_user_id"
                                  />
                                  <TextFieldGroup
                                    placeholder="amount"
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={this.onChange}
                                    info="Enter amount to settle"
                                  />
                                  <TextFieldGroup
                                    placeholder="settle_date"
                                    name="settle_date"
                                    value={this.state.settle_date}
                                    onChange={this.onChange}
                                    info="Please enter settle_date"
                                  />
                                  <input
                                    type="submit"
                                    value="Settle"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { dashboardContent }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getDashboardDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  auth: state.auth,
});

export default connect(mapStateToProps, { getDashboardDetails, getUserGroupDetails, getCurrentProfile, getAllGroups, getAllUsers, settleUp })(Dashboard);