const { Client } = require("pg");

module.exports = async app => {
  const client = new Client({
    user: app.get("PGUSER"),
    host: app.get("PGHOST"),
    database: app.get("PGDATABASE"),
    password: app.get("PGPASSWORD"),
    port: app.get("PGPORT")
  });
  await client.connect();

  return {
    // remove async awaits when these are moved to being called by dataloader!
    // actually remove new PRomise part and use try catch for error handling
    async getItems() {
      try {
        return (await client.query("SELECT * FROM items")).rows;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    async getItem(id) {
      try {
        return (await client.query("SELECT * FROM items WHERE id = $1", [id]))
          .rows;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async getTags(id) {
      try {
        return (await client.query(
          `SELECT * FROM tags
        INNER JOIN item_tags ON item_tags.tagid = tags.id
        WHERE item_tags.itemid = $1`,
          [id]
        )).rows;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async getSharedItems(id) {
      try {
        return (await client.query(
          `SELECT * FROM items
        WHERE itemowner = $1`,
          [id]
        )).rows;
      } catch (e) {
        console.log(e);
        return [];
      }
    }
  };
};
