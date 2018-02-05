const DataLoader = require("dataloader");

module.exports = ({
  postgresResource: { getItems, getAllTags, getTags },
  firebaseResource: { getUser, getUsers }
}) => ({
  getItems: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
  getTags: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
  getAllTags: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
  getUsers: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
  getUser: new DataLoader(ids => Promise.all(ids.map(id => getItems(id))))
});
