import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyD85Zj27iqFlVqpwrGC3EW4aI7f0hpjaxU",
    authDomain: "family-messaging-6799f.firebaseapp.com",
    databaseURL: "https://family-messaging-6799f.firebaseio.com",
    projectId: "family-messaging-6799f",
    storageBucket: "family-messaging-6799f.appspot.com",
    messagingSenderId: "154092687798",
    appId: "1:154092687798:web:3bf42caf61871c5aa03117",
    measurementId: "G-2G2BX0KMWJ"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    });
}