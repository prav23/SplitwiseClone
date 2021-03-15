import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from "./layout/navbar";
import Sidebar from "./layout/sidebar";
import Landing from "./layout/landing";
import Register from "./auth/register";
import Login from "./auth/login";

import Dashboard from "./dashboard/dashboard";
import Activity from "./expense/recentActivity";
import MyGroups from "./groups/myGroups";
import MyFriends from "./groups/myFriends";

import CreateProfile from "./profile/createProfile";
import EditProfile from "./profile/editProfile";
import CreateGroup from "./groups/createGroup";

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
                    <Route path="/activity" component={Activity} />
                    <Route path="/mygroups" component={MyGroups} />
                    <Route path="/myfriends" component={MyFriends} />

                    <Route path="/createprofile" component={CreateProfile} />
                    <Route path="/editprofile" component={EditProfile} />
                    <Route path="/creategroup" component={CreateGroup} />
                    
                    </div>
                </div>                
            </div>
        )
    }
}
//Export The Main Component
export default Main;