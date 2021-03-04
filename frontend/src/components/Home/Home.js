import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios({
            url: 'http://localhost:3001/api/home',
            method: 'get',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"}
          }).then((response) => {
                //update the state with the response data
                var booksMap = [
                    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
                    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
                    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
                ]
                this.setState({
                    books : this.state.books.concat(booksMap) 
                });
            });
    }

    render(){
        //iterate over books to create a table row
        let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;