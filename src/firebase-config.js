// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrUbblixmPSNrNpYZfs7a-17wSP1LBCN4",
  authDomain: "learning-machine-alpha.firebaseapp.com",
  projectId: "learning-machine-alpha",
  storageBucket: "learning-machine-alpha.appspot.com",
  messagingSenderId: "792896806273",
  appId: "1:792896806273:web:70c36660c7355da2389c80",
  measurementId: "G-X0FRE6RM0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);