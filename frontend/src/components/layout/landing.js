import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  render() {
    return (
      <div class="container pt-5">
        <img src="/1562695882824.jpg" class="img-fluid"></img>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
