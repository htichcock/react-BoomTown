import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Link } from 'react-router-dom';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';

const HeaderBar = ({ isLoading, itemsMaster }) => (
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
                    {isLoading ? (
                        <SelectField
                            disabled
                            className="filter-select"
                            hintText="Filter by Tag"
                        />
                    ) : (
                        <SelectField
                            className="filter-select"
                            hintText="Filter by Tag"
                        >
                            {itemsMaster
                                .map(item => item.tags)
                                .join()
                                .split(',')
                                .reduce(
                                    (accu, curr) =>
                                        (accu.includes(curr)
                                            ? accu
                                            : accu.concat(curr)),
                                    []
                                )
                                .map(tag => (
                                    <MenuItem
                                        value={tag}
                                        label={tag}
                                        primaryText={tag}
                                    />
                                ))}
                        </SelectField>
                    )}
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

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    itemsMaster: state.items.itemsMaster,
    error: state.items.error
});
export default connect(mapStateToProps)(HeaderBar);
