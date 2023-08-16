import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERId,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_Id
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };
export const storage = firebase.storage()