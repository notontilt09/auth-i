import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import Register from './Register';

import './Login.css';

const url = 'http://localhost:5000';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            isRegistering: false,
            errorMsg: '',
          }
    }
    
    handleChanges = e => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        axios.post(`${url}/api/login`, { username: this.state.username, password: this.state.password })
        .then(res => {
            this.setState({
            isLoggedIn: true,
            errorMsg: ''
            })
        })
        .catch(err => {
            this.setState({
            errorMsg: err.response.data.message
        })
        })
    }
    
    navToRegister = e => {
        e.preventDefault();
        this.setState({
        isRegistering: true,
        })
        this.props.history.push('/register')
    }
    
    render() {
        return (
        <div className="App">
            <h1>Auth Practice</h1>
            {!this.state.isLoggedIn && !this.state.isRegistering &&
            <>
                <form onSubmit={this.handleSubmit} className="login-form">
                <input 
                    required 
                    type='text' 
                    name='username' 
                    placeholder='username'
                    value={this.state.username} 
                    onChange={this.handleChanges} 
                />
                <input 
                    required 
                    type='password' 
                    name='password' 
                    placeholder='password'
                    value={this.state.password} 
                    onChange={this.handleChanges} 
                />
                <button type='submit'>Login</button>
                <button onClick={this.navToRegister}>Click here to register a new account.</button>
                </form>
                <section className='error'>
                <h3>{this.state.errorMsg}</h3>
                </section>
            </>
            }
            <Route path="/register" component={Register} />
            {/* <Route path="/users" component={UsersList} /> */}
        </div>
        );
    }
}
      
export default withRouter(Login);
