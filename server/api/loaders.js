const DataLoader = require("dataloader");

module.exports = ({
  postgresResource: { getItem, getItems, getSharedItems, getUser, getUsers }
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
    }
  },
  Mutation: {
    addItem(root, payload) {
      console.log(payload);
      return { title: payload.newItem.title };
    },
    updateItem(root, payload) {
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
    async tags(item) {
      return (await getItem(item.id)).tags;
    }
  },
  User: {
    shareditems(user) {
      return getSharedItems(user.id);
    }
  }
});
