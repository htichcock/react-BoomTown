// ACTIONS

const PROFILE_GET_LOADING = 'PROFILE_GET_LOADING';
const PROFILE_GET_ITEMS = 'PROFILE_GET_ITEMS';
const PROFILE_GET_ERROR = 'PROFILE_GET_ERROR';

// ACTION CREATORS

const getProfileLoading = () => ({ type: PROFILE_GET_LOADING });
const getProfileItems = profileItems => ({
    type: PROFILE_GET_ITEMS,
    payload: profileItems
});
const getProfileError = error => ({ type: PROFILE_GET_ERROR, payload: error });

export const fetchItemsAndUsers = userId => dispatch => {
    dispatch(getProfileLoading());

    const ITEMS_URL = `http://localhost:4000/items/?itemowner=${userId}`;
    const USERS_URL = 'http://localhost:4000/users';

    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    let newProfileItemsData = [];

    Promise.all([items, users])
        .then(response => {
            const itemsArray = response[0];
            const usersArray = response[1];

            const userTable = {};
            usersArray.forEach(user => {
                userTable[user.id] = user;
            });

            newProfileItemsData = itemsArray.map(item => {
                if (item.itemowner) {
                    item.itemowner = userTable[item.itemowner];
                }
                if (item.borrower) {
                    item.borrower = userTable[item.borrower];
                }
                return item;
            });
            dispatch(getProfileItems(newProfileItemsData));
        })
        .catch(error => dispatch(getProfileError(error.message)));
};

// REDUCER

export default (
    state = {
        profileItemsData: [],
        isLoading: false,
        error: null
    },
    action
) => {
    switch (action.type) {
    case PROFILE_GET_LOADING: {
        return { ...state, isLoading: true, error: null };
    }
    case PROFILE_GET_ITEMS: {
        const profileItemsData = action.payload;
        return {
            ...state,
            profileItemsData,
            isLoading: false,
            error: null
        };
    }
    case PROFILE_GET_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    default: {
        return state;
    }
    }
};
