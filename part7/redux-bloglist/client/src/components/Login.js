import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';

import { sendMessage, clearMessage } from '../reducers/notification';
import { loginUser } from '../reducers/login';

import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = (props) => {
    const username = useField('text');
    const password = useField('text');
  
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            let response = await loginService.login({
                username: username.input().value,
                password: password.input().value 
            });

            props.loginUser(response);
            window.localStorage
                .setItem('LoggedInBlogUser', JSON.stringify(response));
            blogService.setToken(response.token);
        }
        catch(exception) {
            if(exception.response) {
                props.sendMessage(exception.response.data.error, 'red');
            }  
  
        }
        finally {
            username.reset();
            password.reset();
        }
    };

    return (
        <div>
            <h1>Login in Application</h1>
            <form onSubmit={handleLogin}>
                <div>username
                    <input {...username.input()}/>
                </div>
                <div>password
                    <input {...password.input()} />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

const mapDispatchToProp = {
    loginUser,
    sendMessage,
    clearMessage,
};

export default connect(
    null,
    mapDispatchToProp,
)(Login);