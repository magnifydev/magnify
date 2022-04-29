import React from 'react';
import userdefault from './assets/user.png';
import './App.css';

function App(props) {

    var user = props.user;
    var authlevel = 0;
    if (props.authlevel) {
        authlevel = props.authlevel;
        
    }

    function tagToggle(id) {
        var tag = document.getElementById(id);
        if (tag.classList.contains("tag-true")) {
            tag.classList.remove("tag-true");
            /*
            let firstChild = tag.firstChild;
            firstChild.classList.add("hide");
            */
        } else {
            tag.classList.add("tag-true");
            /*
            let firstChild = tag.firstChild;
            firstChild.classList.remove("hide");
            */
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function toggleNav() {

        if (document.documentElement.style.getPropertyValue("--nav-width") !== "250px") {
            document.documentElement.style.setProperty("--nav-width", "250px");
        } else {
            document.documentElement.style.removeProperty("--nav-width");
        }

    }

    // <button id="dev=only" onClick={() => {console.log(user)}}>Dev-Only</button>

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
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                                <span className="title">Manage</span>
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

                    <button id="signer" className="login">{user ? "Sign Out" : "Login"}</button>

                    <div className="user">
                        <img id="user-img" src={user ? user._delegate.photoURL : userdefault}></img>
                    </div>
                </div>
                <div className="tag-container">
                    <button id="MAT" className="tag" onClick={() => tagToggle("MAT")}><ion-icon class="hide" name="checkmark-outline"></ion-icon><p>Math</p></button>
                    <button id="ENG" className="tag" onClick={() => tagToggle("ENG")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>English</button>
                    <button id="SOC" className="tag" onClick={() => tagToggle("SOC")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>History</button>
                    <button id="SCI" className="tag" onClick={() => tagToggle("SCI")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Science</button>
                    <button id="BUS" className="tag" onClick={() => tagToggle("BUS")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Business</button>
                    <button id="ART" className="tag" onClick={() => tagToggle("ART")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Art</button>
                    <button id="IND" className="tag" onClick={() => tagToggle("IND")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Trade</button>
                    <button id="MUS" className="tag" onClick={() => tagToggle("MUS")}><ion-icon class="hide" name="checkmark-outline"></ion-icon>Music</button>
                </div>
                <div id="course-container">{props.classitems}</div>
            </div>
            <div onClick={() => topFunction()} id="to-top" className="jump-to-top">
                <ion-icon name="chevron-up-outline" size="larger"></ion-icon>
            </div>
        </div>
    );
}

export default App;