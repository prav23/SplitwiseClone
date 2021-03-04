import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from "./layout/navbar";
import Landing from "./layout/landing";
import Register from "./auth/register";
import Login from "./auth/login";
import Dashboard from "./dashboard/dashboard";

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </div>
            
              
        )
    }
}
//Export The Main Component
export default Main;