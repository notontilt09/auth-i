import React from 'react';
import { withRouter } from 'react-router-dom';

import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        }
    }

    handleChanges = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    render() {
        return (
            <div className='register-form'>
                <h1>Register New User</h1>
                <form onSubmit={this.handleSubmit}>
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
                    <button type='submit'>Register</button>
                </form>
                <h3>{this.state.errorMsg}</h3>
            </div>
        )
    }
}

export default withRouter(Register);