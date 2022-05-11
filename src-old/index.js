import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Course from './Course'
import localcoursedata from './assets/coursedata.json'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

let coursedata
let user
let authdata
let authlevel = 0

const firebaseConfig = {
  apiKey: 'AIzaSyB7xPx53G2Q39jxMghxSN2P1vaf0YjukwE',
  authDomain: 'courseinspector.firebaseapp.com',
  databaseURL: 'https://courseinspector-default-rtdb.firebaseio.com',
  projectId: 'courseinspector',
  storageBucket: 'courseinspector.appspot.com',
  messagingSenderId: '714692191382',
  appId: '1:714692191382:web:3d52f73c4d534ee5f6ceb7',
  measurementId: 'G-NJ5MX0KYYK'
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth()
// Add Google as an authentication provider
const provider = new firebase.auth.GoogleAuthProvider()

// Get data from realtime database
const dbRef = firebase.database().ref()
dbRef.get().then((snapshot) => {
  if (snapshot.exists()) {
    coursedata = snapshot.val().courses

    InitializeCourseViewer()
  } else {
    coursedata = localcoursedata
    InitializeCourseViewer()
  }
}).catch((error) => {
  coursedata = localcoursedata
  InitializeCourseViewer()
})

function InitializeCourseViewer () {
  // #region Set Up
  const courseArr = Object.keys(coursedata)
  const courseItems = courseArr.map((name) => <Course authlevel={authlevel} course={coursedata[name]} />)

  renderDOM(courseItems)

  const search = document.getElementById('searchbar')
  search.addEventListener('input', filterCourses)

  const buttons = document.getElementsByClassName('tag')

  const signInButton = document.getElementById('signer')
  signInButton.addEventListener('click', signInWithRedirect)

  // Add jump to top button
  const topButton = document.getElementById('to-top')
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() }

  function scrollFunction () {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      topButton.style.display = 'block'
    } else {
      topButton.style.display = 'none'
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i]
    btn.addEventListener('click', filterCourses)
  }
  // #endregion

  // This is for the search bar to reload results on enter instead of every time a new input is detected.
  /* Uncomment this for the above behavior, and comment out the other event listener
      search.addEventListener('keydown', function (e) {
      if (e.code === "Enter") {
        filterArr(e);
      }
    });
    */
}

function filterCourses (e) {
  setTimeout(() => {
    const dict = {
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
      MUS: 'Music'
    }

    const search = document.getElementById('searchbar')
    let renderedItems = Object.keys(coursedata)
    const tags = document.getElementsByClassName('tag')
    const truetags = []

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        truetags.push(tags[i].id)
      }
    }

    if (!(truetags.length === 0)) { /* If this is not true, all the tags are not true and no filtering action needs to be done */
      renderedItems = renderedItems.filter((name) => {
        let isPresent = false
        for (let i = 0; i < truetags.length; i++) {
          const tag = truetags[i]
          try {
            if (coursedata[name].tags[0] === dict[tag]) {
              isPresent = true
            }
          } catch (e) {
          }
        }

        if (isPresent) {
          return (true)
        } else {
          return (false)
        }
      })
    }

    let key = search.value.toLowerCase()
    key = key.replaceAll(' ', '-')
    renderedItems = renderedItems.filter(name => (name.search(key) !== -1)).map((name) => {
      return <Course authlevel={authlevel} course={coursedata[name]} />
    })

    renderDOM(renderedItems)
  }, 20)
}

/**
     *
     * @param {object} courseItems
     * @param {firebase.User} user
     */
function renderDOM (courseItems, userdata = user) {
  ReactDOM.render(
    <React.StrictMode>
      <App user={userdata} authlevel={authlevel} classitems={<div class='parent'>{courseItems}</div>} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

firebase.auth()
  .getRedirectResult()
  .then((result) => {
    // The signed-in user info.
    user = result.user

    dbRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        authdata = snapshot.val().users

        // Authorize the user if the user has been logged in
        if (user !== null) {
          try {
            Object.keys(authdata).forEach(key => {
              if (user._delegate.email == authdata[key].email) {
                authlevel = authdata[key].level
                console.log(`You are currently authorized with a level of ${authlevel}`)
              }
            })
            filterCourses()
          } catch (error) {
            console.log(error)
          }
        }
      }
    }).catch((error) => {
    })
  }).catch((error) => {
    console.error(error)
  })

function signInWithRedirect () {
  const button = document.getElementById('signer')
  if (button.textContent === 'Login') {
    firebase.auth().signInWithRedirect(provider)
  } else {
    firebase.auth().signOut().then(() => {
      user = null
      authlevel = 0
      filterCourses() // Reload the DOM to update sign-in status
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error)
    })
  }
}
