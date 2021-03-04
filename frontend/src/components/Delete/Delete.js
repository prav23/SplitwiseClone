import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class Delete extends Component{
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
            validBookId : undefined,
            invalidBookIdInput : false
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    //BookID change handler to update state variable with the text entered by the user
    bookIdChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitDelete = (e) => {
        //prevent page from refresh
        e.preventDefault();
    
        const data = {
            BookID : this.state.BookID,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        validBookId : true
                    })
                }
            })
            .catch(err => {
                this.setState({
                    validBookId : false
                })
            });
    }
    
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        let errorMessage = null;
        if(this.state.validBookId === false){
            errorMessage = (<div class = "container">
                <h2 style={{"color": "red"}}>Book Id doesnt exist</h2>
            </div>);
        }
        if(this.state.validBookId === true){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div class="container">
                {redirectVar}
                <form onSubmit = {this.submitDelete} >
                    <div class = "delete-form">
                        <div style={{width: "50%"}} class="form-group">
                            <input onChange = {this.bookIdChangeHandler} class="form-control" type="text" name="BookID" placeholder="Search a Book by Book ID" required/>
                        </div>
                        <div style={{width: "50%"}}>
                            <input class="btn btn-success" type='submit' value='Delete' />
                        </div>
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Delete;