import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { Link } from "react-router-dom";
import logo from "../../images/boomtown-logo.svg";
import "./styles.css";
const HeaderBar = () => (
  <div className="app-header-wrapper">
    <AppBar
      style={{
        background: "white"
      }}
      className="header-bar"
      iconElementLeft={
        <div className="logo-filter-wrapper">
          <div className="logo-wrapper">
            <img style={{ height: "36px" }} src={logo} />
          </div>
          <SelectField className="filter-select" hintText="Filter by Tag">
            <MenuItem />
          </SelectField>
        </div>
      }
      iconElementRight={
        <div className="nav-btn-wrapper">
          <Link to={"/profile"}>
            <RaisedButton
              labelStyle={{ fontWeight: 400 }}
              label="My Profile"
              className="profile-button"
              primary
            />
          </Link>
          <Link to={"/login"}>
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
