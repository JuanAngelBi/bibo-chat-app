// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ_pd4OpyRYGXPmmNRq8am800j6ri3pE0",
  authDomain: "bibomsg-tp2-3636c.firebaseapp.com",
  databaseURL: "https://bibomsg-tp2-3636c-default-rtdb.firebaseio.com",
  projectId: "bibomsg-tp2-3636c",
  storageBucket: "bibomsg-tp2-3636c.appspot.com",
  messagingSenderId: "221256415033",
  appId: "web:fd6a2f773f9fbff3779ae8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);