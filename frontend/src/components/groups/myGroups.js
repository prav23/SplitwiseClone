import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroupsDetails } from '../../actions/groupsActions';
import axios from "axios";

class MyGroups extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      this.props.getGroupsDetails(user.user_id);
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
    const { groupsDetails, groupsLoading } = this.props.groups;
    const { allGroups, profile } = this.props.dashboard;
    const history = this.props.history;
    let groupsList = [];
    let allGroupsList = [];
    if(groupsDetails){
      groupsList = groupsDetails.data.userGroups;
      allGroupsList = allGroups.data.allGroups;
    }
    let currency = "USD";
    if(profile){
      currency = profile.data.currency;
    }
    let myGroupsContent;
    const handleLeaveGroup = ( group_id ) => {
      console.log(group_id, user.user_id);
      axios.delete(`http://localhost:3001/api/usergroups/${group_id}/${user.user_id}`);
      const ln = this.props.getGroupsDetails;
      setTimeout(() => ln(user.user_id), 2000);
    }
    
    const handleAcceptInvite = ( group_id ) => {
      console.log(group_id, user.user_id);
      const inviteUserGroupData = {
        group_id,
        user_id: user.user_id,
      }
      axios.put("http://localhost:3001/api/usergroups/groupinvite", inviteUserGroupData);
      const ln = this.props.getGroupsDetails;
      setTimeout(() => ln(user.user_id), 2000);
    }
    if (groupsLoading) {
      myGroupsContent = (<div>
        <p className="lead text-muted">
        My Groups Loading!!
        </p>        
      </div>);
    } else {
        if(groupsList){
            myGroupsContent = (
                <div class="list-group mt-2">
                    {groupsList.map(ug => 
                    {
                    return (
                        <div key={ ug.id } className="mb-2 border rounded">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">
                              Group Name :: { (allGroupsList.find(x => x.group_id === ug.group_id)).group_name}
                            </h5>
                          </div>
                          <p class="mb-1">Total owed in Group by {user.name} is: "{ ug.total_owed }" { currency }</p>
                          <p class="mb-1">Group Status :: { ug.status }</p>
                          <div>
                          { ug.status === "Registered" && 
                          <button className="btn btn-info btn-block mt-2 mb-2" onClick = {e => history.push(`/groupActivity/${ug.group_id}`)}> Vist Group Page</button>
                          }
                          </div>
                          <div>
                          { ug.status === "Invited" && 
                          <button className="btn btn-info btn-block mt-2 mb-2" onClick = {e => handleAcceptInvite(ug.group_id)}> Accept Group Invite</button>
                          }
                          </div>
                          <div>
                          { ug.total_owed === 0 && ug.status === "Registered" && 
                          <button className="btn btn-info btn-block mt-2 mb-2" onClick = {e => handleLeaveGroup(ug.group_id)}> Leave Group</button>
                          }
                          </div>
                        </div>
                      );
                    }
                )}
                </div>
            );
        }
        else{
            myGroupsContent = (
                <div>
                    <p className="lead text-muted">
                    No Groups For this User
                    </p>
            </div>
            );
        }
    }
    return (
        isAuthenticated && <main class="col-md-2 col-lg-10">
      <div class="align-items-center">
        <h4 class="h2">My Groups</h4>
        { myGroupsContent }
      </div>
    </main>
    );
  }
}

MyGroups.propTypes = {
  getGroupsDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  groups: state.groups,
  auth: state.auth,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { getGroupsDetails })(MyGroups);