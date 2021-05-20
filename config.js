import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBXeEzD1vq-b05dRnIciLIh9Mwgda2x2D8",
    authDomain: "booksanta-26b26.firebaseapp.com",
    databaseURL: "https://booksanta-26b26-default-rtdb.firebaseio.com",
    projectId: "booksanta-26b26",
    storageBucket: "booksanta-26b26.appspot.com",
    messagingSenderId: "580815325524",
    appId: "1:580815325524:web:db1b1a1a93d80ad645a0c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore()