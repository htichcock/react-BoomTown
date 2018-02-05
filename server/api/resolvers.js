module.exports = ({
  postgresResource: {
    getTags,
    getAllTags,
    getItem,
    getItems,
    getSharedItems,
    createItem
  },
  firebaseResource: { getUser, getUsers }
}) => ({
  Query: {
    items() {
      return getItems();
    },
    item(root, { id }) {
      return getItem(id);
    },
    users() {
      return getUsers();
    },
    user(root, { id }) {
      return getUser(id);
    },
    allTags() {
      return getAllTags();
    }
  },
  Mutation: {
    addItem(root, { newItem }) {
      return createItem(newItem);
    },
    updateItem(root, payload) {
      //todo: make this for borrowing, maybe add delete functionality
      return { id: payload.updatedItem.id };
    }
  },
  Item: {
    itemowner(item) {
      return getUser(item.itemowner);
    },
    borrower(item) {
      return item.borrower ? getUser(item.borrower) : null;
    },
    tags(item) {
      return getTags(item.id);
    }
  },
  User: {
    shareditems(user) {
      return getSharedItems(user.id);
    }
  }
});
