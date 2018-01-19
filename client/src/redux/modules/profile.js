import MD5 from 'crypto-js/md5';
import moment from 'moment';
import { filterItemList } from '../helpers';
// ACTIONS

const PROFILE_GET_LOADING = 'PROFILE_GET_LOADING';
const PROFILE_SET_MASTER = 'PROFILE_SET_MASTER';
const PROFILE_GET_ERROR = 'PROFILE_GET_ERROR';
const PROFILE_GET_FILTERED = 'PROFILE_GET_FILTERED';

// ACTION CREATORS

const getProfileLoading = () => ({ type: PROFILE_GET_LOADING });
const setProfileItemsMaster = profileItemsMaster => ({
    type: PROFILE_SET_MASTER,
    payload: profileItemsMaster
});
export const getProfileItemsFiltered = (profileItems, filterBy = null) => ({
    type: PROFILE_GET_FILTERED,
    payload: { profileItems, filterBy }
});
const getProfileError = error => ({ type: PROFILE_GET_ERROR, payload: error });

export const fetchItemsAndUsers = userId => dispatch => {
    dispatch(getProfileLoading());

    const ITEMS_URL = `http://localhost:4000/items/?itemowner=${userId}`;
    const USERS_URL = 'http://localhost:4000/users';

    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    function generateGravatarURL(email) {
        return `//www.gravatar.com/avatar/${MD5(email).toString()}.jpg`;
    }
    function generateTimeFromNow() {
        return moment(this.created).fromNow(); // this bound to item obj
    }
    let newProfileItemsData = [];

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

            newProfileItemsData = itemsArray.map(item => {
                if (item.itemowner) {
                    item.itemowner = userTable[item.itemowner];
                }
                if (item.borrower) {
                    item.borrower = userTable[item.borrower];
                }
                item.timeFromNowFunc = generateTimeFromNow.bind(item);
                return item;
            });
            dispatch(setProfileItemsMaster(newProfileItemsData));
        })
        .catch(error => dispatch(getProfileError(error.message)));
};

// REDUCER

export default (
    state = {
        profileItemsData: [],
        profileItemsMaster: [],
        isLoaded: false,
        error: null
    },
    action
) => {
    switch (action.type) {
    case PROFILE_GET_LOADING: {
        return { ...state, isLoaded: false, error: null };
    }
    case PROFILE_SET_MASTER: {
        const profileItemsMaster = action.payload;
        const profileItemsData = state.profileItemsData.length
            ? state.profileItemsData
            : profileItemsMaster;
        return {
            ...state,
            profileItemsData,
            profileItemsMaster,
            isLoaded: true,
            error: null
        };
    }
    case PROFILE_GET_ERROR: {
        return { ...state, isLoaded: false, error: action.payload };
    }
    case PROFILE_GET_FILTERED: {
        let profileItemsData =
                action.payload.filterBy && state.profileItemsMaster.length
                    ? filterItemList(
                        state.profileItemsMaster,
                        action.payload.filterBy
                    )
                    : state.profileItemsData;
        if (!profileItemsData.length) {
            profileItemsData = state.profileItemsMaster;
        }
        return {
            ...state,
            profileItemsData,
            error: null
        };
    }
    default: {
        return state;
    }
    }
};
