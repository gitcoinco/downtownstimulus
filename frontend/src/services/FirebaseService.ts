import * as firebase from "firebase/app";
import "firebase/auth";

// const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY
// const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
// const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
// const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
// const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
// const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
// const FIREBASE_APPID = process.env.REACT_APP_FIREBASE_APPID
// const FIREBASE_MEASUREMENTID = process.env.REACT_APP_FIREBASE_MEASUREMENTID

const FIREBASE_KEY = 'AIzaSyDQaEt__JE2N8VpOHyDms4gdBcCrbpMe3g'
const FIREBASE_AUTH_DOMAIN = 'downtown-stimulus.firebaseapp.com'
const FIREBASE_DATABASE_URL = 'https://downtown-stimulus.firebaseio.com'
const FIREBASE_PROJECT_ID = 'downtown-stimulus'
const FIREBASE_STORAGE_BUCKET = 'downtown-stimulus.appspot.com'
const FIREBASE_MESSAGING_SENDER_ID = '441301072810'
const FIREBASE_APPID = '1:441301072810:web:bf6c5f83f7bd7f9b6ec9d3'
const FIREBASE_MEASUREMENTID = 'G-9GZG7Y792M'

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
};

console.log('firebaseConfig', firebaseConfig)
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signInSocial = async (pType: string) => {
  var provider =
    pType === "google"
      ? new firebase.auth.GoogleAuthProvider()
      : new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = (result.credential.toJSON() as any).oauthAccessToken;
    // The signed-in user info.
    var user = result.user;
    return { user, token };
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  }
};

export const getAuthToken = async () => {
  const result = await firebase.auth().currentUser.getIdToken();
  return result;
};

export const logoutUser = async () => {
  await firebase.auth().signOut();
};
