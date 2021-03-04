import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class Create extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
            Title : "",
            Author : "",
            duplicateBookIdCheckFail : false,
            validBookId : false
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }

    //BookID change handler to update state variable with the text entered by the user
    bookIdChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    //Title change handler to update state variable with the text entered by the user
    titleChangeHandler = (e) => {
        this.setState({
            Title : e.target.value
        })
    }
    //Author change handler to update state variable with the text entered by the user
    authorChangeHandler = (e) => {
        this.setState({
            Author : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitCreate = (e) => {
        //prevent page from refresh
        e.preventDefault();

    const data = {
        BookID : this.state.BookID,
        Title : this.state.Title,
        Author : this.state.Author
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/create',data)
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
                duplicateBookIdCheckFail : true
            })
        });
    }

    render(){
        let redirectVar = null;
        // let redirectCreate = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        let errorMessage = null;
        if(this.state.duplicateBookIdCheckFail){
            errorMessage = (<div class = "container">
                <h2 style={{"color": "red"}}>Book Id already exists</h2>
            </div>);
        }
        if(this.state.validBookId){
            redirectVar = <Redirect to= "/home"/>
        }    
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form onSubmit = {this.submitCreate} >
                        <div class="login-form">
                            <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.bookIdChangeHandler} type="text" class="form-control" name="BookID" placeholder="Book ID" required />
                            </div>
                            <br/>
                            <div style={{width: '30%'}} class="form-group">
                                    <input onChange = {this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="Book Title" required />
                            </div>
                            <br/>
                            <div style={{width: '30%'}} class="form-group">
                                    <input onChange = {this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Book Author" required />
                            </div>
                            <br/>
                            <div style={{width: '30%'}}>
                                <input class="btn btn-success" type='submit' value='Create' />
                            </div> 
                        </div> 
                    </form>
                    <div>
                        {errorMessage}
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;