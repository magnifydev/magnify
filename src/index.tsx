import App from './App';
import { ClearFilter, Course, Loader } from './components';
import { firebaseConfig } from './config';
import localCourseData from './data/coursedata.json';
import './index.css';
import { CourseDataType } from './types';
import { getWidth } from './utils';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React from 'react';
import ReactDOM from 'react-dom';

const renderLoader = (): void => {
  ReactDOM.render(
    <React.StrictMode>
      <Loader />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderLoader();

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
    courseData = snapshot.exists() ? snapshot.val().courses : localCourseData;
    initializeCourseViewer();
  })
  .catch(() => {
    courseData = localCourseData;
    initializeCourseViewer();
  });

const renderDOM = (courseItems: JSX.Element[], userData = user): void => {
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

const initializeCourseViewer = (): void => {
  // Read the cookie and check whether the given user is authorized
  if (getCookieValue('user')) {
    // There shouldn't be an error here, but to prevent unnecessary crashes or security issues a try catch here is useful
    try {
      user = JSON.parse(getCookieValue('user'));
    } catch (error) {
      console.error(error);
    }
  }

  if (user) {
    dbRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        authData = snapshot.val().users;

        Object.keys(authData).forEach((key) => {
          if (user?.email === authData[key].email) {
            authLevel = authData[key].level;
          }
        });

        filterCourses();
      }
    });
  }

  const courseArray = Object.keys(courseData);
  const courseItems = courseArray.map((name) => (
    <Course
      key={name}
      authLevel={authLevel}
      course={courseData[name]}
      jumpId={name}
    />
  ));

  renderDOM(courseItems);

  const search = document.getElementById('searchbar');
  const tagButtons = document.getElementsByClassName('tag');
  const signInButton = document.getElementById('signer');
  const topButton = document.getElementById('to-top');

  search?.addEventListener('input', filterCourses);
  signInButton?.addEventListener('click', signInWithRedirect);

  let prevScrollpos = window.scrollY;
  window.onscroll = () => {
    handleDesktopScrollToTopDisplay();
    handleMobileNavigationOnScroll();
  };

  const handleDesktopScrollToTopDisplay = (): void => {
    if (!topButton) {
      throw new Error('Supposed element with id to-top nonexistent');
    }

    if (window.scrollY >= 80 && getWidth() >= 525) {
      topButton.style.visibility = 'visible';
      topButton.style.opacity = '1';
    } else {
      topButton.style.visibility = 'hidden';
      topButton.style.opacity = '0';
    }
  };

  const handleMobileNavigationOnScroll = (): void => {
    if (getWidth() >= 525) return;

    const nav = document.getElementById('mobile-nav');
    if (!nav) {
      throw new Error('Supposed element with id mobile-nav nonexistent');
    }

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

export const filterCourses = (): void => {
  setTimeout(() => {
    const tagCodes = {
      ADP: 'Advanced Placement',
      MAT: 'Math',
      BUS: 'Business',
      SOC: 'Social Studies',
      ENG: 'English',
      IND: 'Engineering',
      FAM: 'Family Consumer Sciences',
      AGR: 'Agriculture',
      SCI: 'Science',
      HPE: 'Health/PE',
      ART: 'Art',
      FOR: 'Foreign Language',
      MUS: 'Music',
      TAG: 'Talented and Gifted',
      VEN: 'Venture',
    };

    const search = document.getElementById('searchbar') as HTMLInputElement;
    let renderedItems = Object.keys(courseData);
    const tags = document.getElementsByClassName('tag');
    const tagAll = document.getElementById('ALL');
    const trueTags: string[] = [];

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        trueTags.push(tags[i].id);
        tagAll?.classList.remove('tag-all');
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
          if (!isValidKey(tag)) {
            throw new Error(`${tag} is an invalid index for tagCodes`);
          }

          if (courseData[name].tags?.includes(tagCodes[tag])) {
            isPresent = true;
          }
        }

        return isPresent;
      });
    } else {
      tagAll?.classList.add('tag-all');
    }

    const key = search?.value.toLowerCase().replaceAll(' ', '-');
    const renderedElements = renderedItems
      .filter((name) => name.search(key) !== -1)
      .map((name) => {
        return (
          <Course
            key={name}
            authLevel={authLevel}
            course={courseData[name]}
            jumpId={name}
          />
        );
      });

    if (!renderedElements.length) {
      renderedElements.push(<ClearFilter />);
    }
    renderDOM(renderedElements);
    window.location.hash = '';
  }, 20);
};

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    // The signed-in user info.
    user = result.user;

    if (user) {
      document.cookie = `user=${JSON.stringify(user)}`;
    }

    dbRef.get().then((snapshot) => {
      if (!snapshot.exists()) return;
      authData = snapshot.val().users;

      // Authorize the user if the user has been logged-in
      if (user !== null) {
        Object.keys(authData).forEach((key) => {
          if (user?.email === authData[key].email) {
            authLevel = authData[key].level;
          }
        });
        filterCourses();
      }
    });
  });

const signInWithRedirect = (): void => {
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
        document.cookie =
          'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        filterCourses(); // Reload the DOM to update sign-in status
        // Sign-out successful
      });
  }
};

const getCookieValue = (name: string): string =>
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
