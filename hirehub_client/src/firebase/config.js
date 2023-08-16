import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  projectId:process.env.REACT_PROJECT_ID,
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGINGSENDERId,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_Id
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };
export const storage = firebase.storage()