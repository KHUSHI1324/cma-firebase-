import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdms5J0sFMUczk0nCYZIWOmtkoyDWe4Qw",
  authDomain: "chats-b6e27.firebaseapp.com",
  projectId: "chats-b6e27",
  storageBucket: "chats-b6e27.appspot.com",
  messagingSenderId: "87999522590",
  appId: "1:87999522590:web:d1e7e0461a5fb839ce0b0f",
  measurementId: "G-GY67QM3M9S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();