const ITEMS_GET_FILTERS = 'ITEMS_GET_FILTERS';

export const getItemsFilters = filters => ({
    type: ITEMS_GET_FILTERS,
    payload: filters
});

// REDUCER

export default (
    state = {
        itemsFilters: []
    },
    action
) => {
    if (action.type === ITEMS_GET_FILTERS) {
        const itemsFilters = action.payload;
        return {
            ...state,
            itemsFilters
        };
    }
    return state;
};
