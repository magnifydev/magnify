import App from './App';
import Course from './Course';
import firebaseConfig from './config/firebase';
import localCourseData from './data/coursedata.json';
import './index.css';
import CourseDataType from './types/courseDataType';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React from 'react';
import ReactDOM from 'react-dom';

let courseData: CourseDataType;
let user: firebase.User | null;
let authData: { [key: string]: { email: string; level: number } };
let authLevel = 0;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
firebase.auth();
// Add Google as an authentication provider
const provider = new firebase.auth.GoogleAuthProvider();
// Get data from realtime database
const dbRef = firebase.database().ref();

dbRef
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      courseData = snapshot.val().courses;
      initializeCourseViewer();
    } else {
      courseData = localCourseData;
      initializeCourseViewer();
    }
  })
  .catch(() => {
    courseData = localCourseData;
    initializeCourseViewer();
  });

const initializeCourseViewer = () => {
  // #region Set Up
  const courseArr = Object.keys(courseData);
  const courseItems = courseArr.map((name, index) => (
    <Course key={index} authLevel={authLevel} course={courseData[name]} />
  ));

  renderDOM(courseItems);

  const search = document.getElementById('searchbar');
  search?.addEventListener('input', filterCourses);

  const buttons = document.getElementsByClassName('tag');

  const signInButton = document.getElementById('signer');
  signInButton?.addEventListener('click', signInWithRedirect);

  // Add jump to top button
  const topButton = document.getElementById('to-top');
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = () => scrollFunction();

  const scrollFunction = () => {
    if (topButton === null) throw Error('top button nonexistent');

    if (
      document.body.scrollTop > 70 ||
      document.documentElement.scrollTop > 70
    ) {
      topButton.style.display = 'block';
    } else {
      topButton.style.display = 'none';
    }
  };

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.addEventListener('click', filterCourses);
  }
  // #endregion
  // This is for the search bar to reload results on enter instead of every time a new input is detected.
  // Uncomment this for the above behavior, and comment out the other event listener
  // search?.addEventListener('keydown', function (e) {
  //   if (e.code === 'Enter') {
  //     filterArr(e);
  //   }
  // });
};

const filterCourses = () => {
  setTimeout(() => {
    const tagMap = {
      MAT: 'Math',
      BUS: 'Business',
      SOC: 'History',
      ENG: 'English',
      IND: 'Trade',
      FAM: 'Life Skills',
      AGR: 'Agriculture',
      SCI: 'Science',
      HPE: 'Health/PE',
      ART: 'Art',
      FOR: 'Foreign Language',
      MUS: 'Music',
    };

    const search = document.getElementById('searchbar') as HTMLInputElement;
    let renderedItems = Object.keys(courseData);
    const tags = document.getElementsByClassName('tag');
    const trueTags: string[] = [];

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        trueTags.push(tags[i].id);
      }
    }

    const isValidTagKey = (key: string): key is keyof typeof tagMap => {
      return key in tagMap;
    };

    // If this is not true, all the tags are not true and no filtering action needs to be done
    if (trueTags.length !== 0) {
      renderedItems = renderedItems.filter((name) => {
        let isPresent = false;

        for (let i = 0; i < trueTags.length; i++) {
          const tag = trueTags[i];
          try {
            if (!isValidTagKey(tag))
              throw Error(`${tag} is an invalid index for tagMap`);

            if (courseData[name].tags?.[0] === tagMap[tag]) {
              isPresent = true;
            }
          } catch (error) {
            console.error(error);
          }
        }

        if (isPresent) {
          return true;
        } else {
          return false;
        }
      });
    }

    let key = search?.value.toLowerCase();
    key = key.replaceAll(' ', '-');
    const renderedElements = renderedItems
      .filter((name) => name.search(key) !== -1)
      .map((name, index) => {
        return (
          <Course key={index} authLevel={authLevel} course={courseData[name]} />
        );
      });

    renderDOM(renderedElements);
  }, 20);
};

/**
 *
 * @param {object} courseItems
 * @param {firebase.User} user
 */
const renderDOM = (courseItems: JSX.Element[], userdata = user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        user={userdata}
        classItems={<div className="parent">{courseItems}</div>}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    // The signed-in user info.
    user = result.user;

    dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          authData = snapshot.val().users;

          // Authorize the user if the user has been logged in
          if (user !== null) {
            try {
              Object.keys(authData).forEach((key) => {
                if (user?.email === authData[key].email) {
                  authLevel = authData[key].level;
                  console.log(
                    `You are currently authorized with a level of ${authLevel}`
                  );
                }
              });
              filterCourses();
            } catch (error) {
              console.error(error);
            }
          }
        }
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));

const signInWithRedirect = () => {
  const button = document.getElementById('signer');
  if (button?.textContent === 'Login') {
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase
      .auth()
      .signOut()
      .then(() => {
        user = null;
        authLevel = 0;
        filterCourses(); // Reload the DOM to update sign-in status
        // Sign-out successful.
      })
      .catch((error) => console.log(error));
  }
};
