import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "ecommerce-app-f2f9d.firebaseapp.com",
  projectId: "ecommerce-app-f2f9d",
  storageBucket: "ecommerce-app-f2f9d.appspot.com",
  messagingSenderId: "591234519387",
  appId: "1:591234519387:web:2872938b5cb346f6a5ca7e",
  measurementId: "G-E9T78Q495B"
};
// initialize app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize db
const db = firebaseApp.firestore();

// authentication variable
const auth = firebase.auth();

export { db, auth };
