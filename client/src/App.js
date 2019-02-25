import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false
    }
  }
  
  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
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
        </form>
        {/* <Route path="/register" component={Register} />
        <Route path="/users" component={UsersList} /> */}
      </div>
    );
  }
}

export default App;
