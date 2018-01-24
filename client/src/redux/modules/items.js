// ACTIONS

const ITEMS_GET_LOADING = 'ITEMS_GET_LOADING';
const ITEMS_GET = 'ITEMS_GET';
const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR';
const ITEMS_GET_FILTERS = 'ITEMS_GET_FILTERS';

// ACTION CREATORS

const getItemsLoading = () => ({ type: ITEMS_GET_LOADING });
const getItems = itemsData => ({
    type: ITEMS_GET,
    payload: itemsData
});
export const getItemsFilters = filters => ({
    type: ITEMS_GET_FILTERS,
    payload: filters
});
const getItemsError = error => ({ type: ITEMS_GET_ERROR, payload: error });

export const fetchItemsAndUsers = () => dispatch => {
    dispatch(getItemsLoading());
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
                userTable[user.id] = user;
            });

            newItemsData = itemsArray.map(item => {
                if (item.itemowner) {
                    item.itemowner = userTable[item.itemowner];
                }
                if (item.borrower) {
                    item.borrower = userTable[item.borrower];
                }
                return item;
            });
            dispatch(getItems(newItemsData));
        })
        .catch(error => dispatch(getItemsError(error.message)));
};

// REDUCER

export default (
    state = {
        itemsData: [],
        itemsFilters: [],
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
        const itemsData = action.payload;
        return {
            ...state,
            itemsData,
            isLoading: false,
            error: null
        };
    }
    case ITEMS_GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    case ITEMS_GET_FILTERS: {
        const itemsFilters = action.payload;
        return {
            ...state,
            itemsFilters,
            error: null
        };
    }
    default: {
        return state;
    }
    }
};
