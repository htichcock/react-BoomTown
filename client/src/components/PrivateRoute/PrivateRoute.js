import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import { firebaseAuth } from '../../config/firebaseConfig';

export default class PrivateRoute extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            isLoading: true
        };

        this.authchange = firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ auth: true });
                this.setState({ isLoading: false });
            } else {
                this.setState({ isLoading: false });
                this.setState({ auth: false });
            }
        });
    }
    render() {
        if (!this.state.isLoading) {
            return this.state.auth ? (
                <Route {...this.props} />
            ) : (
                <Redirect to="/login" />
            );
        }
        return (
            <div className="loading-wrapper">
                <CircularProgress color="white" />
            </div>
        );
    }
}
