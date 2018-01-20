import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Items} />
                        <Route
                            exact
                            path="/profile/:userId"
                            component={Profile}
                        />
                        {/* <Route exact path="/login" component={Share} />  */}
                        <Route path="/" component={NotFound} />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
