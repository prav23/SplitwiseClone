import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.getCurrentProfile();
  // }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-8">Splitwise Dashboard</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);