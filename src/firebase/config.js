// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYebw08zhvTmSh4LrpV9jcO_8WeoXqvLY",
  authDomain: "tribbl.firebaseapp.com",
  projectId: "tribbl",
  storageBucket: "tribbl.firebasestorage.app",
  messagingSenderId: "88083241619",
  appId: "1:88083241619:web:eb658a29a8135f57e68b66",
  measurementId: "G-SMWDB0M52C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);