import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history } from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';

const Boomtown = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Items} />
                        <Route
                            exact
                            path="/profile/:userId"
                            render={routeProps => (
                                <Profile
                                    {...routeProps}
                                    key={routeProps.match.params.userId}
                                />
                            )}
                        />
                        {/* <Route exact path="/login" component={Share} />  */}
                        <Route path="/" component={NotFound} />
                    </Switch>
                </Layout>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
