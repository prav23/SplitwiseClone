import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateGroup} from '../../actions/groupsActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { allGroups } = this.props.dashboard;
    let allGroupsList = [];
    if(allGroups){
      allGroupsList = allGroups.data.allGroups;
    }
    const group_id = Number(this.props.match.params.groupId);
    const groupImage = (allGroupsList.find(x => x.group_id === group_id)).group_image;
    const groupName = (allGroupsList.find(x => x.group_id === group_id)).group_name;
    this.state = {
      image: groupImage ,
      name: groupName,
      errors: {},
      file: null,
      base64URL: ""
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
      group_id: Number(this.props.match.params.groupId),
      group_image: this.state.base64URL,
      group_name: this.state.name,
    };
    console.log(groupData);
    this.props.updateGroup(groupData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileInputChange = e => {
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });
  };

  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;
    
    return (
      isAuthenticated && <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Update Your Profile</h2>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Enter your name"
                />
                <img style = {{width:"200px",height:"200px"}} src={this.state.image} class="img-thumbnail" alt="..."/>

                <TextFieldGroup
                  placeholder="group_image"
                  type="file"
                  name="group_image"
                  onChange={this.handleFileInputChange}
                  info="Choose Group Image"
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


EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard,
  errors: state.errors
});

export default connect(mapStateToProps,{ updateGroup })(withRouter(EditProfile));