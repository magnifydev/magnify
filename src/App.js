import React, { useState } from 'react';
import userdefault from './assets/user.png';
import './App.css';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

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
    const dummy = {
        "uid": "xcZK6Rp2THXZ520ncMk33KrbvbT2",
        "email": "vapradeep817@gmail.com",
        "emailVerified": true,
        "displayName": "Ascent",
        "isAnonymous": false,
        "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgpyS6fYl7CyUzAx_Cy7TJos-ppsuys-yTCZEulkQ=s96-c",
        "providerData": [
            {
                "providerId": "google.com",
                "uid": "115514179979743638838",
                "displayName": "Ascent",
                "email": "vapradeep817@gmail.com",
                "phoneNumber": null,
                "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgpyS6fYl7CyUzAx_Cy7TJos-ppsuys-yTCZEulkQ=s96-c"
            }
        ],
        "stsTokenManager": {
            "refreshToken": "AIwUaOnFTUUqVos2-Z6oly0QqWjl1PAu3SBdbKt6VP_qinjCl0JG0MdrDFrvS8xlTwxlS0NbCj2uKpEYyCdtdhUvHRquSDPTS8Ty42-fsHSh5HeR6OtFTD0CiM1vXMI435TZoN_nk20AMPiJazfhxWJ2QPge1IToeGbHHNKYMpfRLJ4zBBmkJM2fyT3dygOa_GEr76-wETO9bv_brmA6xaw6BMoSBRyAg5UBUj528_nEKPGMaw0blNHyzH9IuGWgRKTBtsj6b98m67hd4bXC8Ohwy2QwfkjYCmBdNkjdCvpEfmzM6lWNANi-h0RaPsEMq--R9-rnjn6hX6TwiU_vBpf1SuSDyIe0KgoFjYlPpGVXAcmxlcZO82zNozkgrhDC3RGtfBzf7MvBLXaX24YAkmyDWdf_57m20kSfTxjIVwm6FhlLg9Z6hQs",
            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVmMzAxNjFhOWMyZGI3ODA5ZjQ1MTNiYjRlZDA4NzNmNDczMmY3MjEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXNjZW50IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdncHlTNmZZbDdDeVV6QXhfQ3k3VEpvcy1wcHN1eXMteVRDWkV1bGtRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvdXJzZWluc3BlY3RvciIsImF1ZCI6ImNvdXJzZWluc3BlY3RvciIsImF1dGhfdGltZSI6MTY1MTk2MzM2MSwidXNlcl9pZCI6InhjWks2UnAyVEhYWjUyMG5jTWszM0tyYnZiVDIiLCJzdWIiOiJ4Y1pLNlJwMlRIWFo1MjBuY01rMzNLcmJ2YlQyIiwiaWF0IjoxNjUxOTYzMzYxLCJleHAiOjE2NTE5NjY5NjEsImVtYWlsIjoidmFwcmFkZWVwODE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE1NTE0MTc5OTc5NzQzNjM4ODM4Il0sImVtYWlsIjpbInZhcHJhZGVlcDgxN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.QUi4KYwsjKd-W7U2mBRSqbuqnpkyWr08mNNN4SN34OEsQyEyj90C-8DS8Ip41GjBqoX-SyRINRH4xtI-3_KbhLfRHuujxLkgomXkX6HBTwPd11Fh9ENsart7BYXvCZONows_nK-KUU4cg-Edbbrdgh5W8u8UK5xWuDCeXb83JYAg26Znt1vgFk-4J6LZb4Zm0R5MrJs_Cr60-E2cP5PXhSiUNJY2t8nx_BLpbMvY0Ol888R_xu_O0XY-1s2a9MQumY2kY7o3UU11ngtW7FF8LaqdnDhUKkeAJiAwAkGcb7jhs1fg_AoE1IROf5CLGU6m6eTWLn1dKE2Q29DGXaOqtg",
            "expirationTime": 1651966961400
        },
        "createdAt": "1649263590959",
        "lastLoginAt": "1651963361860",
        "apiKey": "AIzaSyB7xPx53G2Q39jxMghxSN2P1vaf0YjukwE",
        "appName": "[DEFAULT]"
    }

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

    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            // The signed-in user info.
            if (result.user != null) {
                console.log(`Setting user to ${dummy}`);
                setUser(dummy)
            }

            console.log(`User is ${user}`);

            dbRef.get().then((snapshot) => {
                if (snapshot.exists()) {
                    authdata = snapshot.val().users;

                    // Authorize the user if the user has been logged in
                    if (user != null) {

                        try {
                            Object.keys(authdata).forEach(key => {
                                if (user.email == authdata[key].email) {
                                    authlevel = authdata[key].level;
                                }
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }).catch((error) => {
                console.error(error);
            });

        }).catch((error) => {
            console.error(error);
        });

    function signInWithRedirect() {
        let button = document.getElementById("signer");
        if (button.textContent === "Login") {
            firebase.auth().signInWithRedirect(provider);
        } else {
            firebase.auth().signOut().then(() => {
                setUser(null);
                authlevel = 0;
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
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