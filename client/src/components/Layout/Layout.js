import React from "react";
import PropTypes from "prop-types";
import HeaderBar from "../HeaderBar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link, Route, Switch, withRouter } from "react-router-dom";

import "./styles.css";

const ShareButton = () => (
  <Link to="/share">
    <FloatingActionButton
      secondary
      style={{ position: "fixed", right: "20px", bottom: "20px" }}
    >
      <ContentAdd />
    </FloatingActionButton>
  </Link>
);

const Layout = ({ children }) => (
  <div className="app-content-wrapper">
    <Switch>
      <Route exact path="/login" />
      <Route path="/" component={HeaderBar} />
    </Switch>
    <div className="app-content">
      {children}
      <Switch>
        <Route exact path="/login" />
        <Route exact path="/share" />
        <Route path="/" component={ShareButton} />
      </Switch>
    </div>
    <footer style={{ textAlign: "center", zIndex: 10 }}>
      © 2017 Boomtown Corp. All Rights Reserved
    </footer>
  </div>
);

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
