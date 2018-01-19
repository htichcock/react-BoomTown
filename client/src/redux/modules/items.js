import MD5 from 'crypto-js/md5';
import moment from 'moment';
import { filterItemList } from '../helpers';
// ACTIONS

const ITEMS_GET_LOADING = 'ITEMS_GET_LOADING';
const ITEMS_SET_MASTER = 'ITEMS_SET_MASTER';
const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR';
const ITEMS_GET_FILTERED = 'ITEMS_GET_FILTERED';

// ACTION CREATORS

const getItemsLoading = () => ({ type: ITEMS_GET_LOADING });
const setItemsMaster = itemsMaster => ({
    type: ITEMS_SET_MASTER,
    payload: itemsMaster
});
export const getItemsFiltered = (itemsData, filterBy = null) => ({
    type: ITEMS_GET_FILTERED,
    payload: { itemsData, filterBy }
});
const getItemsError = error => ({ type: ITEMS_GET_ERROR, payload: error });

export const fetchItemsAndUsers = () => dispatch => {
    dispatch(getItemsLoading());
    function generateGravatarURL(email) {
        return `//www.gravatar.com/avatar/${MD5(email).toString()}.jpg`;
    }
    function generateTimeFromNow() {
        return moment(this.created).fromNow(); // this bound to item obj
    }
    const ITEMS_URL = 'http://localhost:4000/items';
    const USERS_URL = 'http://localhost:4000/users';

    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    let newItemsData = [];

    Promise.all([items, users])
        .then(response => {
            const itemsArray = response[0];
            const usersArray = response[1];

            const userTable = {};
            usersArray.forEach(user => {
                // add time from now and gravatarurl
                user.gravatarurl = generateGravatarURL(user.email);
                // generate userTable
                userTable[user.id] = user;
            });

            newItemsData = itemsArray.map(item => {
                if (item.itemowner) {
                    item.itemowner = userTable[item.itemowner];
                }
                if (item.borrower) {
                    item.borrower = userTable[item.borrower];
                }
                item.timeFromNowFunc = generateTimeFromNow.bind(item);
                return item;
            });
            dispatch(setItemsMaster(newItemsData));
        })
        .catch(error => dispatch(getItemsError(error.message)));
};

// REDUCER

export default (
    state = {
        itemsData: [],
        itemsMaster: [],
        isLoaded: false,
        error: null
    },
    action
) => {
    switch (action.type) {
    case ITEMS_GET_LOADING: {
        return { ...state, isLoaded: false, error: null };
    }
    case ITEMS_SET_MASTER: {
        const itemsMaster = action.payload;
        const itemsData = state.itemsData.length
            ? state.itemsData
            : itemsMaster;
        return {
            ...state,
            itemsData,
            itemsMaster,
            isLoaded: true,
            error: null
        };
    }
    case ITEMS_GET_ERROR: {
        return { ...state, isLoaded: false, error: action.payload };
    }
    case ITEMS_GET_FILTERED: {
        let itemsData =
                action.payload.filterBy && state.itemsMaster.length
                    ? filterItemList(state.itemsMaster, action.payload.filterBy)
                    : state.itemsData;
        if (!itemsData.length) {
            itemsData = state.itemsMaster;
        }
        return {
            ...state,
            itemsData,
            error: null
        };
    }
    default: {
        return state;
    }
    }
};
