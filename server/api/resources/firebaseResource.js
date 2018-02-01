const firebase = require("firebase");
// Initialize Firebase

module.exports = app => {
  const firebaseApp = firebase.initializeApp(app.get("FIREBASE_CONFIG"));
  const firebaseDB = firebaseApp.database();

  return {
    async getUsers() {
      const users = (await firebaseDB.ref(`/users/`).once("value")).val();

      return Object.keys(users).map(key => {
        let user = users[key];
        user.id = key;
        return user;
      });
    },

    async getUser(userid) {
      const user = (await firebaseDB
        .ref(`/users/${userid}`)
        .once("value")).val();
      user.id = userid;
      return user;
    }
  };
};
