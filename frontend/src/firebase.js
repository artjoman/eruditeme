import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXBvxMBD9pJQQmnyml7vqAaN02Mb-cN-A",
    authDomain: "erudite-me.firebaseapp.com",
    databaseURL: "https://erudite-me.firebaseio.com",
    projectId: "erudite-me",
    storageBucket: "erudite-me.appspot.com",
    messagingSenderId: "452722543024",
    appId: "1:452722543024:web:3771b75e393a5eff596e75",
    measurementId: "G-50XQV0RK8T"
};
export const fb = firebase.initializeApp(firebaseConfig);