import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Course from './Course';
import localcoursedata from './assets/coursedata.json';
import firebase from "firebase/compat/app";
import "firebase/compat/database";

var coursedata;

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
// Get data from realtime database
const dbRef = firebase.database().ref();
dbRef.child("courses").get().then((snapshot) => {
    if (snapshot.exists()) {
        coursedata = snapshot.val();
        Initialize();
    } else {
        coursedata = localcoursedata;
        Initialize();
    }
}).catch((error) => {
    coursedata = localcoursedata;
    Initialize();
});

function Initialize() {
    const courseArr = Object.keys(coursedata);

    var courseItems = courseArr.map((name) => <Course course={coursedata[name]} />
    );

    renderDOM(courseItems);

    const search = document.getElementById('searchbar');
    search.addEventListener('input', filterCourses);

    const buttons = document.getElementsByClassName("tag");

    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        btn.addEventListener("click", filterCourses);
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    // This is for the search bar to reload results on enter instead of every time a new input is detected.
    /* Uncomment this for the above behavior, and comment out the other event listener
      search.addEventListener('keydown', function (e) {
      if (e.code === "Enter") {
        filterArr(e);
      }
    });
    */
    function filterCourses(e) {
        setTimeout(() => {

            const dict = {
                MAT: "Math",
                BUS: "Business",
                SOC: "History",
                ENG: "English",
                IND: "Trade",
                FAM: "Life Skills",
                AGR: "Agriculture",
                SCI: "Science",
                HPE: "Health/PE",
                ART: "Art",
                FOR: "Foreign Language",
                MUS: "Music"
            };

            courseItems = courseArr;
            var tags = document.getElementsByClassName("tag");
            var truetags = [];

            for (let i = 0; i < tags.length; i++) {
                if (tags[i].classList.contains("tag-true")) {
                    truetags.push(tags[i].id);
                }
            }

            if (!(0 === truetags.length)) { /* If this is not true, all the tags are not true and no filtering action needs to be done */
                courseItems = courseItems.filter((name) => {
                    var isPresent = false;
                    for (let i = 0; i < truetags.length; i++) {
                        const tag = truetags[i];
                        try {
                            if (coursedata[name].tags[0] === dict[tag]) {
                                isPresent = true;
                            }
                        } catch (e) {
                        }
                    }

                    if (isPresent) {
                        return (true);
                    } else {
                        return (false);
                    }
                });
            }

            var key = search.value.toLowerCase();
            key = key.replaceAll(' ', '-');
            courseItems = courseItems.filter(name => (name.search(key) !== -1)).map((name) => {
                return <Course course={coursedata[name]} />;
            });

            renderDOM(courseItems);
        }, 20);
    }

    function renderDOM(courseItems) {

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }

        ReactDOM.render(
            <React.StrictMode>
                <App classitems={<div class="parent">{courseItems}</div>}></App>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();