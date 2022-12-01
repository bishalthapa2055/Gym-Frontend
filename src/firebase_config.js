// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnjfprjRZLscDByhAl3R_6wdfbw6b2G88",
  authDomain: "gymotp.firebaseapp.com",
  projectId: "gymotp",
  storageBucket: "gymotp.appspot.com",
  messagingSenderId: "29523761712",
  appId: "1:29523761712:web:831d184357a61a840fabf5",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
