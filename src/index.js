import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

var user = null;
var authdata;
var authlevel = 0;

const firebaseConfig = {
    apiKey: "AIzaSyB7xPx53G2Q39jxMghxSN2P1vaf0YjukwE",
    authDomain: "courseinspector.firebaseapp.com",
    databaseURL: "https://courseinspector-default-rtdb.firebaseio.com",
    projectId: "courseinspector",
    storageBucket: "courseinspector.appspot.com",
    messagingSenderId: "714692191382",
    appId: "1:714692191382:web:3d52f73c4d534ee5f6ceb7",
    measurementId: "G-NJ5MX0KYYK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const dbRef = firebase.database().ref();
var provider = new firebase.auth.GoogleAuthProvider();

RenderDom();

firebase.auth()
    .getRedirectResult()
    .then((result) => {
        // The signed-in user info.
        user = result.user;
        RenderDom();

        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                authdata = snapshot.val().users;
                // Authorize the user if the user has been logged in
                if (user != null) {
                    try {
                        Object.keys(authdata).forEach(key => {
                            if (user._delegate.email == authdata[key].email) {
                                authlevel = authdata[key].level;
                                console.log(`You are currently authorized with a level of ${authlevel}`);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }).catch((error) => {
        });

    }).catch((error) => {
        console.error(error);
    });

function RenderDom() {
    ReactDOM.render(
        <React.StrictMode>
            <App user={user} authlevel={authlevel} signInWithRedirect={signInWithRedirect}></App>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

function signInWithRedirect(ref) {
    if (user == null) {
        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut().then(() => {
            user = null;
            authlevel = 0;
            // Sign-out successful.
            // Update DOM to match
            RenderDom();
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
}