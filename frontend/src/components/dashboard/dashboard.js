import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDashboardDetails, getUserGroupDetails, getCurrentProfile, getAllGroups, getAllUsers, settleUp } from '../../actions/dashboardActions';
import SelectListGroup from '../common/SelectListGroup';

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
      source_user_id: this.props.auth.user.user_id,
      target_user_id: this.state.target_user_id,
      userGroupsMap: this.props.dashboard.userGroupDetails.data.userGroups
    };
    this.props.settleUp(settleData, this.props.history);
    const jquery = window.$;
    jquery("#exampleModal").modal("hide");
    const ln = this.props.getDashboardDetails;
    setTimeout(() => ln(settleData.source_user_id), 2000);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { dashboardDetails, dashboardloading, profile, allUsers } = this.props.dashboard;
    let friends_owe_map;
    let dashboardContent;
    let youOweContent;
    let youOwedContent;
    let net_balance = 0, total_owe = 0, total_owed = 0;
    let currency = "USD";
    if(profile){
      currency = profile.data.currency;
    }
    let allUsersList = [];
    let allUserOptions = [];
    if(allUsers !== null && allUsers.data.allUsers){
      allUsersList = allUsers.data.allUsers;
      allUserOptions.push({ label: '* Select Friend', value: '' });
      allUsersList.map(su => allUserOptions.push({label: su.name, value: su.user_id}));
    }
    if(dashboardDetails !== null && dashboardDetails.data.userFriends){
      //console.log(this.props.dashboard.userGroupDetails.data);
      friends_owe_map = Object.entries(dashboardDetails.data.userFriends.friends_owe_map);
      friends_owe_map.map( ([key, value]) => value < 0 ? total_owe = total_owe - value : total_owed = total_owed + value);
      net_balance = total_owed - total_owe;
      youOweContent = (
        <div class="col-sm border">
          You Owe
          {friends_owe_map.map( ([key, value]) => {
            if(value < 0)
              return <div class="col-sm border"> you owe User_ID {key} : "{-value}" { currency } </div>
            else
              return <div></div>
          })}
        </div>
      );
      youOwedContent = (
        <div class="col-sm border py-2">
          You are Owed
          {friends_owe_map.map( ([key, value]) => {
            if(value > 0)
              return <div class="col-sm border" > User_ID {key} owes you : "{value}" { currency } </div>
            else
              return <div></div>
          })}
        </div>
      );
    }
    if (dashboardloading) {
      dashboardContent = (<div>
        <p className="lead text-muted">
        Loading!!
        </p>        
    </div>);
    } else {
        dashboardContent = (
        <>
          <div class="row p-2 mb-2">
            <div class="col-sm border">
              Total Balance : {net_balance} { currency }
            </div>
            <div class="col-sm border">
              You Owe : {total_owe} { currency }
            </div>
            <div class="col-sm border py-2">
              You are Owed : {total_owed} { currency }
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
            <div className= "row mt-2 border rounded p-2 mb-2">
              <div class = "col">
                <h3>Dashboard </h3>
              </div>  
              <div class = "col-6">

              </div>
              <div class = "col">
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
                                  <SelectListGroup
                                    placeholder="target_user_id"
                                    name="target_user_id"
                                    value={this.state.target_user_id}
                                    onChange={this.onChange}
                                    options={allUserOptions}
                                    info="Please Select Friend"
                                  />
                                  <button type="submit" className="btn btn-info btn-block mt-4"> Settle </button>
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