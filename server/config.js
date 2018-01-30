module.exports = app => {
  //pgSQL  config
  app.set("PGUSER", process.env.PGUSER || "boomtowndb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtowndb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtowndb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  //graphql config
  app.set("PORT", process.env.PORT || "3002");
  // temporary json config
  app.set("JSON_PORT", "4000");
};
