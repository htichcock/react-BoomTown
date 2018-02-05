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
    items(root, args, context) {
      return context.loaders.getItems.load(args);
    },
    item(root, { id }) {
      return getItem(id);
    },
    users(root, args, context) {
      return context.loaders.getUsers.load(args);
    },
    user(root, { id }, context) {
      return context.loaders.getUser.load(id);
    },
    allTags(root, args, context) {
      return context.loaders.getAllTags.load();
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
    tags(item, args, context) {
      return context.loaders.getTags.load(item.id);
    }
  },
  User: {
    shareditems(user) {
      return getSharedItems(user.id);
    }
  }
});
