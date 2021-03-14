import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile,getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        email: '',
        image:'',
        phoneNumber: '',
        currency: '',
        language: '',
        timezone: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }
  componentDidMount(){
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
  
        // If profile field doesnt exist, make empty string
        profile.name = !isEmpty(profile.gender) ? profile.gender : '';
        profile.email = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';
        profile.image = !isEmpty(profile.city) ? profile.city : '';
        profile.phoneNumber = !isEmpty(profile.about) ? profile.about : '';
        profile.currency = !isEmpty(profile.country) ? profile.country : '';
        profile.language = !isEmpty(profile.company) ? profile.company : '';
        profile.timezone = !isEmpty(profile.languages) ? profile.languages : '';
  
        // Set component fields state
        this.setState({
          name: profile.name,
          email: profile.email,
          image: profile.image,
          phoneNumber: profile.phoneNumber,
          currency: profile.currency,
          language: profile.language,
          timezone: profile.timezone,
        });
      }
}

  onSubmit(e) {
    e.preventDefault();
    
    const profileData = {
        name: this.state.name,
        email: this.state.email,
        image: this.state.image,
        phoneNumber: this.state.phoneNumber,
        currency: this.state.currency,
        language: this.state.language,
        timezone: this.state.timezone,
    };
    
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    
    const { errors } = this.state;
    
    const currencyOptions = [
        { label: '* Select Currency', value: '' },
        { label: 'USD', value: 'USD' },
        { label: 'KWD', value: 'KWD' },
        { label: 'BHD', value: 'BHD' },
        { label: 'GBP', value: 'GBP' },
        { label: 'EUR', value: 'EUR' },
        { label: 'CAD', value: 'CAD' },
      ];
  
      const timezoneOptions = [
        { label: '* Select Timezone', value: '' },
        { label: 'America/Los_Angeles GMT-08:00', value: 'GMT-08:00' },
        { label: 'Europe/Amsterdam GMT+01:00', value: 'GMT+01:00' },
        { label: 'Asia/Calcutta GMT+05:30', value: 'GMT+05:30' },
        { label: 'Australia/Adelaide GMT+09:30', value: 'GMT+09:30' },
      ];
  
      const languageOptions = [
        { label: '* Select Language', value: '' },
        { label: 'English', value: 'English' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Spanish', value: 'Spanish' },
        { label: 'French', value: 'French' },
        { label: 'Telugu', value: 'Telugu' },
      ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-10">
            </div>
            <div className="col-2">
              <Link to="/dashboard" className="btn btn-light">
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Edit Your Profile</h2>
              <p className="lead text-center">
                Update information about your profile
              </p>
            
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  error={errors.phoneNumber}
                  info="Enter your phone number"
                />
                <SelectListGroup
                  placeholder="Language"
                  name="languages"
                  value={this.state.language}
                  onChange={this.onChange}
                  options={languageOptions}
                  error={errors.language}
                  info="Please select your language"
                />
                <SelectListGroup
                  placeholder="Currency"
                  name="currency"
                  value={this.state.currency}
                  onChange={this.onChange}
                  options={currencyOptions}
                  error={errors.currency}
                  info="Please Select your currency"
                />
                <SelectListGroup
                  placeholder="Time Zone"
                  name="timezone"
                  value={this.state.timezone}
                  onChange={this.onChange}
                  options={timezoneOptions}
                  error={errors.timezone}
                  info="Please select your timezone"
                />
                <TextFieldGroup
                  placeholder="Image"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                  info="Enter your image"
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


CreateProfile.propTypes = {
  createProfile:PropTypes.func.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));