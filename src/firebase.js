import firebase from 'firebase';

// Initialize Firebase
let config = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_AUTH_DOMAIN",
    databaseURL: "FIREBASE_DATABASE_URL",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_STORAGE_BUDGET",
    messagingSenderId: "FIREBASE_SENDER_ID"
};
firebase.initializeApp(config);

let firebaseRef = firebase.database().ref();

export default firebase;

export let chatRef = firebaseRef.child('chat');
export let groupRef = firebaseRef.child('groups');
