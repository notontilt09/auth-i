import React from 'react'
import axios from 'axios';

import './Users.css';

const url = 'http://localhost:5000'

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get(`${url}/api/users`, { headers: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }})
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    routeToLogin = e => {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        if (localStorage.getItem('username')) {
            return (
                <div className='users'>
                    <h2>Users List</h2>
                    <div className='users-list'>
                        {this.state.users.map(user => {
                            return (
                                <div className='user'>
                                    <h2>Username: {user.username}</h2>  
                                    <h2>Password-Hash: {user.password}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="back-to-login">
                    <h2>Please Log In!</h2>
                    <button onClick={this.routeToLogin}>Login</button>
                </div>
            )
        }
    }
}

export default Users