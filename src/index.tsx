import App from './App';
import Course from './Course';
import firebaseConfig from './config/firebase';
import localCourseData from './data/coursedata.json';
import './index.css';
import CourseDataType from './types/courseDataType';
import getWidth from './utils/getWidth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React from 'react';
import ReactDOM from 'react-dom';

let courseData: CourseDataType;
let user: firebase.User | null;
let authData: { [key: string]: { email: string; level: number } };
let authLevel = 0;

firebase.initializeApp(firebaseConfig);
firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
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
  const courseArray = Object.keys(courseData);
  const courseItems = courseArray.map((name) => (
    <Course key={name} authLevel={authLevel} course={courseData[name]} />
  ));

  renderDOM(courseItems);

  const search = document.getElementById('searchbar');
  search?.addEventListener('input', filterCourses);

  const tagButtons = document.getElementsByClassName('tag');

  const signInButton = document.getElementById('signer');
  signInButton?.addEventListener('click', signInWithRedirect);

  const topButton = document.getElementById('to-top');

  let prevScrollpos = window.scrollY;
  window.onscroll = () => {
    displayDesktopScrollToTop();
    handleMobileNavOnScroll();
  };

  const displayDesktopScrollToTop = () => {
    if (!topButton)
      throw new Error('Supposed element with id to-top nonexistent');

    if (
      (document.body.scrollTop > 70 ||
        document.documentElement.scrollTop > 70) &&
      getWidth() >= 500
    ) {
      topButton.style.display = 'flex';
    } else {
      topButton.style.display = 'none';
    }
  };

  const handleMobileNavOnScroll = () => {
    if (getWidth() >= 500) return;

    const nav = document.getElementById('mobile-nav')!;

    const currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
      nav.style.bottom = '0';
    } else {
      nav.style.bottom = `-${nav.offsetHeight}px`;
    }
    prevScrollpos = currentScrollPos;
  };

  for (let i = 0; i < tagButtons.length; i++) {
    const btn = tagButtons[i];
    btn.addEventListener('click', filterCourses);
  }

  // This is for the search bar to reload results on enter instead of every time a new input is detected
  // Uncomment this for the above behavior, and comment out the other event listener
  // search?.addEventListener('keydown', function (e) {
  //   if (e.code === 'Enter') {
  //     filterArr(e);
  //   }
  // });
};

const filterCourses = () => {
  setTimeout(() => {
    const tagCodes = {
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
      LMHS_TAG: 'Talented and Gifted',
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

    const isValidKey = (key: string): key is keyof typeof tagCodes => {
      return key in tagCodes;
    };

    // If this is not true, all the tags are not true and no filtering action needs to be done
    if (trueTags.length) {
      renderedItems = renderedItems.filter((name) => {
        let isPresent = false;

        for (let i = 0; i < trueTags.length; i++) {
          const tag = trueTags[i];
          if (!isValidKey(tag))
            throw new Error(`${tag} is an invalid index for tagCodes`);

          if (courseData[name].tags?.[0] === tagCodes[tag]) {
            isPresent = true;
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
      .map((name) => {
        return (
          <Course key={name} authLevel={authLevel} course={courseData[name]} />
        );
      });

    renderDOM(renderedElements);
  }, 20);
};

const renderDOM = (courseItems: JSX.Element[], userData = user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        user={userData}
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

    dbRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        authData = snapshot.val().users;

        // Authorize the user if the user has been logged-in
        if (user !== null) {
          Object.keys(authData).forEach((key) => {
            if (user?.email === authData[key].email) {
              authLevel = authData[key].level;
              console.log(
                `You are currently authorized with a level of ${authLevel}`
              );
            }
          });
          filterCourses();
        }
      }
    });
  });

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
      });
  }
};
