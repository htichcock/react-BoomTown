import * as firebase from 'firebase';
import 'firebase/auth';
// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAn-jdd-T3LfAyPGp_i8zIZr6_C7RY6sGY',
    authDomain: 'boomtown-420c9.firebaseapp.com',
    databaseURL: 'https://boomtown-420c9.firebaseio.com',
    projectId: 'boomtown-420c9',
    storageBucket: 'boomtown-420c9.appspot.com',
    messagingSenderId: '666067221835'
};
const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
export { firebaseApp, firebaseAuth };
