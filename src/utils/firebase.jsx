import { initializeApp } from "firebase/app";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, updateProfile
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// for functions
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyCWXA8WA98GAVdRcTcN7-wt21Ayxmb6EAE",
  authDomain: "fir-7d0c7.firebaseapp.com",
  projectId: "fir-7d0c7",
  storageBucket: "fir-7d0c7.appspot.com",
  messagingSenderId: "404750806163",
  appId: "1:404750806163:web:2ed149facfd402c64cf166"
  };

// Let’s initialize our app and services so that we can use Firebase throughout our app:
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// for functions
const functions = getFunctions(app);
export {auth, db, storage,functions, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile, doc, setDoc}