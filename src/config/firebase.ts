import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyDL5M-oQos8ZS499eWgEWElT9YctSeWWiU',
  authDomain: 'magnifyyyyy.firebaseapp.com',
  databaseURL: 'https://magnifyyyyy-default-rtdb.firebaseio.com',
  projectId: 'magnifyyyyy',
  storageBucket: 'magnifyyyyy.appspot.com',
  messagingSenderId: '798318460321',
  appId: '1:798318460321:web:4290be6078dddfe8221fe0',
  measurementId: 'G-5X5FRMHDHE',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
