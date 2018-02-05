import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import itemsReducer from './modules/items';

export default combineReducers({
    items: itemsReducer
});
