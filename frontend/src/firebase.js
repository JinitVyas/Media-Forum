// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAH5CpgqPKUYYnDOl9WB31cufpcTlu2sMM",
    authDomain: "k-k-education-67cdd.firebaseapp.com",
    projectId: "k-k-education-67cdd",
    storageBucket: "k-k-education-67cdd.appspot.com",
    messagingSenderId: "1057286062520",
    appId: "1:1057286062520:web:a4d003ea53d3acfd358f4d",
    measurementId: "G-6T8WZ3YN8H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
