import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroupsDetails } from '../../actions/groupsActions';
import { Link } from "react-router-dom";

class MyGroups extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      //this.props.getDashboardDetails(user.user_id);
      //add getExpense from all groups user is part of code later
      this.props.getGroupsDetails(user.user_id);
    }
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
    const { groupsDetails, groupsLoading } = this.props.groups;
    const history = this.props.history;
    let groupsList = [];
    if(groupsDetails){
      groupsList = groupsDetails.data.userGroups;
    }
    console.log(groupsList);
    let myGroupsContent;

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
                            {/* <img
                              class="img-thumbnail"
                              style={{ height: "36px" }}
                              src={countryInfo.flag}
                            ></img> */}
                            <h5 class="mb-1">
                              Group Id :: { ug.group_id}
                            </h5>
                          </div>
                          <p class="mb-1">Total Spent in Group  { ug.total_spent }</p>
                          <p class="mb-1">Total owed in Group by {user.name} is { ug.total_owed }</p>
                          <small>
                            Group Status :: { ug.status }
                          </small>
                          <div></div>
                          <button className="btn btn-info btn-block mt-2 mb-2" onClick = {e => history.push(`/groupActivity/${ug.group_id}`)}> Go to Group :: { ug.group_id }</button>
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
  groups: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  auth: state.auth
});

export default connect(mapStateToProps, { getGroupsDetails })(MyGroups);