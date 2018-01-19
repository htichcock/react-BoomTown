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
export const filterItemList = (itemsData, filterBy) => {
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
};
