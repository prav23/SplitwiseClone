import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <p className="nav-link" to="/">
            {user.name} <i className="fas fa-user-circle fa-lg" />
          </p>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {" "}
            Logout <i className="fas fa-sign-out-alt" />
          </a>
        </li>
      </ul>
    );

    // {isAuthenticated ? authLinks : guestLinks}
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Splitwise
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100 d-flex justify-content-end">
                {
                !isAuthenticated && <><li class="nav-item">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                </>
              }
              {
                isAuthenticated && <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Logout
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
