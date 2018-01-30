import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import client from './config/apolloClient';

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
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
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
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
