// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdQ6-0JdxngANi5TezYP3Bz5m5l73UsPE",
  authDomain: "petcare-app-da588.firebaseapp.com",
  databaseURL: "https://petcare-app-da588-default-rtdb.firebaseio.com",
  projectId: "petcare-app-da588",
  storageBucket: "petcare-app-da588.firebasestorage.app",
  messagingSenderId: "893132112793",
  appId: "1:893132112793:web:e2d348bd3a143fcd2c0908",
  measurementId: "G-CQ6FHSW1T9"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
