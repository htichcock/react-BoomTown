import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

export const history = createHistory();

const middleware = routerMiddleware(history);

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, middleware))
);
