import userdefault from './assets/user.png';
import './App.css';
import coursedata from './assets/coursedata.json'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
// Add Google as an authentication provider
var provider = new firebase.auth.GoogleAuthProvider();

function App(props) {

    function tagToggle(id) {
        var tag = document.getElementById(id);
        if (tag.classList.contains("tag-true")) {
            tag.classList.remove("tag-true");
            let firstChild = tag.firstChild;
            firstChild.classList.add("hide");
        } else {
            tag.classList.add("tag-true");
            let firstChild = tag.firstChild;
            firstChild.classList.remove("hide");
        }
    }

    function signInWithRedirect() {
        let button = document.getElementById("signer");
        if (button.textContent === "Login") {
            firebase.auth().signInWithRedirect(provider);
        } else {
            console.log("Trying to sign out...");
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                //Update pfp in the topbar to match
                let img = document.getElementById("user-img");
                user ? img.src = user._delegate.photoURL : img.src = userdefault;
        
                let button = document.getElementById("signer");
                user ? button.textContent = "Sign Out" : button.textContent = "Login";
              }).catch((error) => {
                // An error happened.
              });
        }
        
    }

    var user;

    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            user = result.user;
            
            //Update pfp in the topbar to match
            let img = document.getElementById("user-img");
            img.src = user._delegate.photoURL;

            let button = document.getElementById("signer");
            user ? button.textContent = "Sign Out" : button.textContent = "Login";
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

        function toggleNav() {
            document.documentElement.style.setProperty('--nav-width', 80);
        }


    return (
        <div className="App">
            <div class="container">
                <div class="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="school-outline"></ion-icon>
                                </span>
                                <span class="title">Course Inspector</span>
                            </a>
                        </li>
                        <li class="hovered">
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="search-outline"></ion-icon>
                                </span>
                                <span class="title">Search All</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                                <span class="title">Manage</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="earth-outline"></ion-icon>
                                </span>
                                <span class="title">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="brush-outline"></ion-icon>
                                </span>
                                <span class="title">Art</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="flask"></ion-icon>
                                </span>
                                <span class="title">Science</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="musical-notes-outline"></ion-icon>
                                </span>
                                <span class="title">Music</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="business-outline"></ion-icon>
                                </span>
                                <span class="title">Business</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="icon">
                                    <ion-icon name="construct-outline"></ion-icon>
                                </span>
                                <span class="title">Trade</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main">
                <div class="topbar">
                    <div class="toggle" /*onClick={() => toggleNav()}*/>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <div class="search">
                        <label>
                            <input id="searchbar" type="text" name="search" placeholder="Search for classes..."></input>
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>

                    <button id="signer" class="login" onClick={() => signInWithRedirect()}>Login</button>

                    <div class="user">
                        <img id="user-img" src={user ? user._delegate.photoURL : userdefault}></img>
                    </div>
                </div>
                <div class="tag-container">
                    <button id="MAT" class="tag" onClick={() => tagToggle("MAT")}><ion-icon class="hide" name="checkmark-outline"></ion-icon><p>Math</p></button>
                    <button id="ENG" class="tag" onClick={() => tagToggle("ENG")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>English</button>
                    <button id="SOC" class="tag" onClick={() => tagToggle("SOC")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>History</button>
                    <button id="SCI" class="tag" onClick={() => tagToggle("SCI")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Science</button>
                    <button id="BUS" class="tag" onClick={() => tagToggle("BUS")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Business</button>
                    <button id="ART" class="tag" onClick={() => tagToggle("ART")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Art</button>
                    <button id="IND" class="tag" onClick={() => tagToggle("IND")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Trade</button>
                    <button id="MUS" class="tag" onClick={() => tagToggle("MUS")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Music</button>
                </div>
                <div id="course-container">{props.classitems}</div>
            </div>
        </div>
    );
}

export default App;

//                    <button id="foreign" class="tag tag-true" onClick={() => tagToggle("foreign")}><ion-icon name="checkmark-outline"></ion-icon>Foreign Languange</button>