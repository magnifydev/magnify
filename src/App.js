import React, { useRef, useState } from 'react';
import userdefault from './assets/user.png';
import './App.css';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import dummy from "sample.json";

function App(props) {
    //#region firebase
    var authlevel = 0;
    var authdata;

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

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    const dbRef = firebase.database().ref();

    //#endregion

    const [user, setUser] = useState(null);
    const signInButton = useRef(null);


    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function toggleNav() {
        if (getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim() !== " 250px") {
            if (getComputedStyle(document.documentElement).getPropertyValue('--pull-width').trim() !== "0px") {
                document.documentElement.style.removeProperty("--pull-width");
            } else {
                document.documentElement.style.setProperty("--pull-width", `${250 - getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim().substring(0, getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim().length - 2)}px`);
            }
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="school-outline"></ion-icon>
                                </span>
                                <span className="title">Course Inspector</span>
                            </a>
                        </li>
                        <li className="hovered">
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="search-outline"></ion-icon>
                                </span>
                                <span className="title">Search All</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://cdn.linnmar.k12.ia.us/wp-content/uploads/2016/11/2022-2023-LMHS-Program-of-Studies-FINAL2-1.pdf">
                                <span className="icon">
                                    <ion-icon name="document-text-outline"></ion-icon>
                                </span>
                                <span className="title">PDF</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="earth-outline"></ion-icon>
                                </span>
                                <span className="title">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="brush-outline"></ion-icon>
                                </span>
                                <span className="title">Art</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="flask"></ion-icon>
                                </span>
                                <span className="title">Science</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="musical-notes-outline"></ion-icon>
                                </span>
                                <span className="title">Music</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="business-outline"></ion-icon>
                                </span>
                                <span className="title">Business</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="construct-outline"></ion-icon>
                                </span>
                                <span className="title">Trade</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main">
                <div className="topbar">
                    <div className="toggle" onClick={() => toggleNav()}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <div className="search">
                        <label>
                            <input id="searchbar" type="text" name="search" placeholder="Search for classes..."></input>
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    <button id="signer" onClick={() => signInWithRedirect()} className="login">
                        {user ? "Sign Out" : "Login"}
                    </button>

                    <div className="user">
                        <img id="user-img" src={user ? user.photoURL : userdefault}></img>
                    </div>

                    <button onClick={() => console.log(user)}>Bleh</button>
                    <button onClick={() => setUser(dummy)}>Bleb</button>
                </div>
                <div className="routeFrame"></div>
            </div>
            <div onClick={() => topFunction()} id="to-top" className="jump-to-top">
                <ion-icon name="chevron-up-outline" size="larger"></ion-icon>
            </div>
        </div>
    );
}

export default App;