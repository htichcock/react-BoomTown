import MD5 from 'crypto-js/md5';
import moment from 'moment';
// ACTIONS

const ITEMS_GET_LOADING = 'ITEMS_GET_LOADING';
const ITEMS_GET = 'ITEMS_GET';
const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR';

// ACTION CREATORS

const getItemsLoading = () => ({ type: ITEMS_GET_LOADING });
const getItems = itemsData => ({ type: ITEMS_GET, payload: itemsData });
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
            dispatch(getItems(newItemsData));
        })
        .catch(error => dispatch(getItemsError(error)));
};

// REDUCER

const itemsReducer = (
    state = {
        itemsData: [],
        isLoading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
    case ITEMS_GET_LOADING: {
        return { ...state, isLoading: true, error: null };
    }
    case ITEMS_GET: {
        return {
            ...state,
            itemsData: action.payload,
            isLoading: false,
            error: null
        };
    }
    case ITEMS_GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    default: {
        return state;
    }
    }
};

export default itemsReducer;
