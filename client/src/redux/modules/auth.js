const AUTH_GET = 'AUTH_GET';

export const getAuth = authenticated => ({
    type: AUTH_GET,
    payload: authenticated
});

export default (
    state = {
        authenticated: false
    },
    action
) => {
    switch (action.type) {
    case AUTH_GET: {
        return { ...state, authenticated: action.payload };
    }
    default: {
        return state;
    }
    }
};
