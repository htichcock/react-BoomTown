import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Switch, Route } from 'react-router-dom';
import {
    ItemsFilterContainer as ItemsFilter,
    ProfileFilterContainer as ProfileFilter
} from '../../containers/Filter';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';

const HeaderBar = () => (
    <div className="app-header-wrapper">
        <AppBar
            style={{
                background: 'white'
            }}
            className="header-bar"
            iconElementLeft={
                <div className="logo-filter-wrapper">
                    <div className="logo-wrapper">
                        <img
                            style={{ height: '36px' }}
                            src={logo}
                            alt="Boomtown Logo"
                        />
                    </div>
                    <Switch>
                        <Route
                            exact
                            path="/profile/:userId"
                            component={ProfileFilter}
                        />
                        <Route exact path="/" component={ItemsFilter} />
                    </Switch>
                </div>
            }
            iconElementRight={
                <div className="nav-btn-wrapper">
                    <Link to={'/profile/k721A4pRNggCx7b6ryEE8vx1VIi1'}>
                        <RaisedButton
                            labelStyle={{ fontWeight: 400 }}
                            label="My Profile"
                            className="profile-button"
                            primary
                        />
                    </Link>
                    <Link to={'/login'}>
                        <RaisedButton
                            labelStyle={{ fontWeight: 400 }}
                            secondary
                            label="Logout"
                        />
                    </Link>
                </div>
            }
            iconStyleRight={{
                margin: 0
            }}
        />
    </div>
);

export default HeaderBar;
