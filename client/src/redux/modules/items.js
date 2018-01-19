import MD5 from 'crypto-js/md5';
import moment from 'moment';
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
// HELPERS
/*
filterBy = {
    filterBy: "itemowner",
    filter: "123123019230(id)"
}
filterBy = {
    filterBy: "tag",
    filter: ["strging","asdja"]
}
filterBy
*/
function filterItemsData(itemsData, filterBy) {
    let filteredItemsData = itemsData;
    if (filterBy.filterBy === 'itemowner') {
        // probably wont be used
        filteredItemsData = itemsData.filter(
            item => filterBy.filter === item.itemowner.id
        );
    } else if (filterBy.filterBy === 'tag') {
        filteredItemsData = itemsData.filter(item =>
            item.tags.some(tag => filterBy.filter.includes(tag))
        );
    } else {
        filteredItemsData = itemsData.filter(
            item => filterBy.filter === item[filterBy.filterBy]
        );
    }
    return filteredItemsData;
}
// REDUCER

export default (
    state = {
        itemsData: [],
        itemsMaster: [],
        isLoading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
    case ITEMS_GET_LOADING: {
        return { ...state, isLoading: true, error: null };
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
            isLoading: false,
            error: null
        };
    }
    case ITEMS_GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    case ITEMS_GET_FILTERED: {
        const itemsData =
                action.payload.filterBy && state.itemsMaster.length
                    ? filterItemsData(
                        state.itemsMaster,
                        action.payload.filterBy
                    )
                    : state.itemsData;
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
