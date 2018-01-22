import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import itemsReducer from './modules/items';
import profileReducer from './modules/profile';

export default combineReducers({
    router: routerReducer,
    items: itemsReducer,
    profile: profileReducer
});
