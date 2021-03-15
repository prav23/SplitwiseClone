import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from "./layout/navbar";
import Sidebar from "./layout/sidebar";
import Landing from "./layout/landing";
import Register from "./auth/register";
import Login from "./auth/login";
import Dashboard from "./dashboard/dashboard";

import CreateProfile from "./profile/createProfile";
import EditProfile from "./profile/editProfile";

import Activity from "./expense/recentActivity";
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                <div className = "row">
                    <Navbar />
                </div>
                <div className = "row">
                    <div className = "col-2">
                        <Sidebar />
                    </div>
                    <div className = "col">
                    <Route exact path="/" component={Landing} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />

                    <Route path="/createprofile" component={CreateProfile} />
                    <Route path="/editprofile" component={EditProfile} />
                    <Route path="/activity" component={Activity} />
                    </div>
                </div>                
            </div>
        )
    }
}
//Export The Main Component
export default Main;