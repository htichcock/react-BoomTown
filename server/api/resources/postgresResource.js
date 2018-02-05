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
    async getAllTags() {
      try {
        return (await client.query("SELECT * FROM tags")).rows;
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
    },
    async createItem({ title, description, imageurl, itemowner, tags }) {
      try {
        await client.query("BEGIN");

        const itemValues = [title, description, imageurl, itemowner];
        const itemInsert =
          "INSERT INTO items(title, description, imageurl, itemowner) VALUES ($1,$2, $3, $4) RETURNING *";

        const itemResult = (await client.query(itemInsert, itemValues)).rows[0];

        safeValues = tags.map((tagid, i) => `($1, $${i + 2})`).join(", ");
        const itemTagInsert = `INSERT INTO item_tags VALUES ${safeValues}`;
        itemTagsValues = [itemResult.id, ...tags.map(t => t.id)];

        const itemTagsResult = (await client.query(
          itemTagInsert,
          itemTagsValues
        )).rows[0];

        await client.query("COMMIT");
        return itemResult;
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    }
  };
};
