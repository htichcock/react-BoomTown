import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Filter from '../../containers/Filter';
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
                    <Filter />
                </div>
            }
            iconElementRight={
                <div className="nav-btn-wrapper">
                    <Link to={'/profile'}>
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
