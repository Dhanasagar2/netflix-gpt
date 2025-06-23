// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAfZkySz5PhbzsAET0t60Gnkxxrz3C3dw",
  authDomain: "netflixgpt-7dc0b.firebaseapp.com",
  projectId: "netflixgpt-7dc0b",
  storageBucket: "netflixgpt-7dc0b.firebasestorage.app",
  messagingSenderId: "214208429639",
  appId: "1:214208429639:web:9fad6086fbb88349593b62",
  measurementId: "G-MH89GVP541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);