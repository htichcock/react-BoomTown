module.exports = app => {
  //pgSQL  config
  app.set("PGUSER", process.env.PGUSER || "boomtowndb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtowndb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtowndb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PGPORT", process.env.PGPORT || "5432");
  //graphql config
  app.set("PORT", process.env.PORT || "3002");

  app.set("FIREBASE_CONFIG", {
    apiKey: "AIzaSyAn-jdd-T3LfAyPGp_i8zIZr6_C7RY6sGY",
    authDomain: "boomtown-420c9.firebaseapp.com",
    databaseURL: "https://boomtown-420c9.firebaseio.com",
    projectId: "boomtown-420c9",
    storageBucket: "boomtown-420c9.appspot.com",
    messagingSenderId: "666067221835"
  });
};
