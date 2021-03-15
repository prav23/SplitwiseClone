import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createGroup} from '../../actions/groupsActions';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      group_name:'',
      group_image: '',
      errors: {}
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
    
    const groupData = {
      group_name: this.state.group_name,
      group_image: this.state.group_image,
      user_id: this.props.auth.user.user_id
    };
    
    this.props.createGroup(groupData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;

    return (
        isAuthenticated && <div className="create-group">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Create Group</h2>
              
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Group Name"
                  name="group_name"
                  value={this.state.group_name}
                  onChange={this.onChange}
                  error={errors.group_name}
                  info="Enter Group Name"
                />
                <TextFieldGroup
                  placeholder="Group Image"
                  name="group_image"
                  value={this.state.group_image}
                  onChange={this.onChange}
                  error={errors.group_image}
                  info="Please add group_image name"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateGroup.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{createGroup})(withRouter(CreateGroup));