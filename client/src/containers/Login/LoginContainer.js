import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import { firebaseAuth } from '../../config/firebaseConfig';
import Login from './Login';

class LoginContainer extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            emailErr: '',
            passwordErr: '',
            redirect: false,
            isLoading: true
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.authchange = firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ redirect: true });
                this.setState({ isLoading: false });
            } else {
                this.setState({ isLoading: false });
                this.setState({ redirect: false });
            }
        });
    }
    handleEmailChange(ev) {
        this.setState({ email: ev.target.value, emailErr: '' });
    }
    handlePassChange(ev) {
        this.setState({ password: ev.target.value, passwordErr: '' });
    }
    login = async () => {
        firebaseAuth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`ERROR code:${errorCode} mess:${errorMessage}`);
                switch (errorCode) {
                case 'auth/invalid-email': {
                    this.setState({ emailErr: errorMessage });
                    break;
                }
                case 'auth/user-disabled': {
                    this.setState({ emailErr: errorMessage });
                    break;
                }
                case 'auth/user-not-found': {
                    this.setState({ emailErr: errorMessage });
                    break;
                }
                case 'auth/wrong-password': {
                    this.setState({
                        password: '',
                        passwordErr: errorMessage
                    });
                    break;
                }

                default: {
                    this.setState({
                        emailErr: errorMessage,
                        passwordErr: errorMessage
                    });
                }
                }
            });
    };

    render() {
        if (!this.state.isLoading) {
            return this.state.redirect ? (
                <Redirect to="/" />
            ) : (
                <Login
                    login={this.login}
                    handleEmailChange={this.handleEmailChange}
                    handlePassChange={this.handlePassChange}
                    passwordValue={this.state.password}
                    emailValue={this.state.email}
                    emailErr={this.state.emailErr}
                    passwordErr={this.state.passwordErr}
                />
            );
        }
        return (
            <div className="loading-wrapper">
                <CircularProgress color="white" />
            </div>
        );
    }
}

export default LoginContainer;
