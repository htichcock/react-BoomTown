import React, { Component } from 'react';
import Login from './Login';

class LoginContainer extends Component {
    login = () => {};

    render() {
        return <Login login={this.login} />;
    }
}

export default LoginContainer;
