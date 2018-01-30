const fetch = require("node-fetch");

module.exports = app => {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;

  return {
    Query: {
      items() {
        return fetch(ITEMS_URL).then(r => r.json());
      },
      item(root, { id }) {
        return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
      },
      users() {
        return fetch(USERS_URL).then(r => r.json());
      },
      user(root, { id }) {
        return fetch(`${USERS_URL}/${id}`).then(r => r.json());
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
        return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
      },
      borrower(item) {
        return item.borrower
          ? fetch(`${USERS_URL}/${item.borrower}`).then(r => r.json())
          : null;
      },
      async tags(item) {
        return (await fetch(`${ITEMS_URL}/${item.id}`).then(r => r.json()))
          .tags;
      }
    },
    User: {
      shareditems(user) {
        return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
      }
    }
  };
};
