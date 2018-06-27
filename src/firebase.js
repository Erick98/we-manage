import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBto1ytd8PbkcD7WuuBu2LY0LnJpku1znw",
    authDomain: "proyecto-wemanage.firebaseapp.com",
    databaseURL: "https://proyecto-wemanage.firebaseio.com",
    projectId: "proyecto-wemanage",
    storageBucket: "proyecto-wemanage.appspot.com",
    messagingSenderId: "661795800620"
});

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();