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

    const { user } = this.props.auth;
    const { dashboardDetails, userGroupDetails, dashboardloading } = this.props.dashboard;
    let friends_owe_map;
    let userGroupsList = [];
    let dashboardContent;
    if(dashboardDetails !== null){
      console.log(dashboardDetails);
      friends_owe_map = Object.entries(dashboardDetails.data.userFriends.friends_owe_map);
      console.log(friends_owe_map);
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
            //     Dashboard {user.name}..!!
            //     </p>
            //     <p className="lead text-muted">
            //     Friends: { friends_owe_map }
            //     </p>
            //     {/* <ProfileActions /> */}
            //     <p className="lead text-muted">
            //     User Groups
            //     </p>
            //     <p className="lead text-muted">
            //     {userGroupsList.map(ug => <div>{ug.user_id} {ug.group_id}  {ug.status} </div>)}
            //     </p>
            // </div>
          <div class="row">
            <div class="col-sm border-right">
              Total Balance
            </div>
            <div class="col-sm ">
              You Owe
            </div>
            <div class="col-sm border-left py-2">
              You are Owed
            </div>
          </div>
            
        );
    }
    return (
      <div className="dashboard">
        <div className="container">
            <div className= "row mt-2 border-bottom">
              <div class = "col">
                <h3>Dashboard </h3>
              </div>  
              <div class = "col-6">

              </div>
              <div class = "col">
                <button class = "btn btn-primary">Settle Up</button>
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