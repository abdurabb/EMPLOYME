import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
  // Your Firebase configuration
  apiKey:"AIzaSyAkooINN8NtuIcSFoUeyX2XRa_wYLGeJfM",
  authDomain:"hire-hub-de870.firebaseapp.com",
  projectId:"hire-hub-de870",
  storageBucket:"hire-hub-de870.appspot.com",
  messagingSenderId:"767794697261",
  appId:"1:767794697261:web:5a14cf5d90fe1ccc3c94a4",
  measurementId:"G-BYV693W8KD"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };
export const storage = firebase.storage()