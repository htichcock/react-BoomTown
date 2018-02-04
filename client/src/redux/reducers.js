import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import authReducer from './modules/auth';

export default combineReducers({
    items: itemsReducer,
    auth: authReducer
});
