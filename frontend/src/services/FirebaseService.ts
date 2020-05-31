import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDQaEt__JE2N8VpOHyDms4gdBcCrbpMe3g",
  authDomain: "downtown-stimulus.firebaseapp.com",
  databaseURL: "https://downtown-stimulus.firebaseio.com",
  projectId: "downtown-stimulus",
  storageBucket: "downtown-stimulus.appspot.com",
  messagingSenderId: "441301072810",
  appId: "1:441301072810:web:bf6c5f83f7bd7f9b6ec9d3",
  measurementId: "G-9GZG7Y792M",
};
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
