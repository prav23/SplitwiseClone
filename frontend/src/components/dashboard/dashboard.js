import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDashboardDetails, getUserGroupDetails } from '../../actions/dashboardActions';
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.props.getDashboardDetails(user.user_id);
      this.props.getUserGroupDetails(user.user_id);
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
    const { dashboardDetails, userGroupDetails, dashboardloading } = this.props.dashboard;
    let friends_owe_map;
    let userGroupsList = [];
    let dashboardContent;
    let youOweContent;
    let youOwedContent;

    if(dashboardDetails !== null){
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
                        Add Settle Up Code Here
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
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
  dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  auth: state.auth
});

export default connect(mapStateToProps, { getDashboardDetails, getUserGroupDetails })(Dashboard);