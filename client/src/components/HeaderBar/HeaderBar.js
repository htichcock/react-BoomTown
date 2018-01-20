import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Filter from '../Filter';
import logo from '../../images/boomtown-logo.svg';
import './styles.css';
import { getItemsFilters } from '../../redux/modules/items';
import mockCurrentUser from '../../mockCurrentUser';

const HeaderBar = ({ isLoading, itemsData, itemsFilters, dispatch }) => (
    <div className="app-header-wrapper">
        <AppBar
            style={{
                background: 'white'
            }}
            className="header-bar"
            iconElementLeft={
                <div className="logo-filter-wrapper">
                    <Link to={'/'}>
                        <div className="logo-wrapper">
                            <img
                                style={{ height: '36px' }}
                                src={logo}
                                alt="Boomtown Logo"
                            />
                        </div>
                    </Link>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Filter
                                handleChange={(event, index, values) => {
                                    dispatch(getItemsFilters(values));
                                }}
                                isLoading={isLoading}
                                itemsData={itemsData}
                                values={itemsFilters}
                            />
                        )}
                    />
                </div>
            }
            iconElementRight={
                <div className="nav-btn-wrapper">
                    <Link to={`/profile/${mockCurrentUser.id}`}>
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
    itemsData: state.items.itemsData,
    itemsFilters: state.items.itemsFilters
});
export default connect(mapStateToProps)(HeaderBar);
