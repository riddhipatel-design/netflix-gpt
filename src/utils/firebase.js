// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBvTszA2-UNgG8Uo_7e8BOGAZ9cCtAHok",
  authDomain: "netflixgpt-bcee1.firebaseapp.com",
  projectId: "netflixgpt-bcee1",
  storageBucket: "netflixgpt-bcee1.firebasestorage.app",
  messagingSenderId: "146362740920",
  appId: "1:146362740920:web:3980940467721ac452844d",
  measurementId: "G-FD98PL0FLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export { analytics };