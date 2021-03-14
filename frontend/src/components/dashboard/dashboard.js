import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDashboardDetails } from '../../actions/dashboardActions';
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.props.getDashboardDetails(user.user_id);
    }
  }

  render() {

    const { user } = this.props.auth;
    const { dashboardDetails, dashboardloading } = this.props.dashboard;
    let friends_owe_map;
    let dashboardContent;
    if(dashboardDetails !== null){
      console.log(dashboardDetails);
      friends_owe_map = Object.entries(dashboardDetails.data.userFriends.friends_owe_map);
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
            <div>
                <p className="lead text-muted">
                Hello {user.name}..!!
                </p>
                <p className="lead text-muted">
                Friends: { friends_owe_map }
                </p>
                {/* <ProfileActions /> */}
            </div>
        );
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
          <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
        <li><Link class="nav-link" to="/dashboard">
            Dashboard
          </Link></li>
          <li><Link class="nav-link" to="/activity">
            Activity
          </Link></li>
          <li><Link class="nav-link" to="/mygroups">
            My Groups
          </Link></li>
          <li><Link class="nav-link" to="/friends">
            My Friends
          </Link></li>
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard Hello {user.name} ..!!</h1>
        { dashboardContent }
      </div>
    </main>
  </div>
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

export default connect(mapStateToProps, { getDashboardDetails })(Dashboard);