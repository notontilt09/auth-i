import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import Register from './Register';
import Login from './Login';
import Users from './Users';

import './App.css';

const url = 'http://localhost:5000';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/' component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default withRouter(App);
