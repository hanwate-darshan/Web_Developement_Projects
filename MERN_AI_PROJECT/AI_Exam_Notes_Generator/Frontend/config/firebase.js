// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn7rdXfN79dBHyh9usuay_lSa-jNvphjI",
  authDomain: "examnotesgenerator.firebaseapp.com",
  projectId: "examnotesgenerator",
  storageBucket: "examnotesgenerator.firebasestorage.app",
  messagingSenderId: "422498375217",
  appId: "1:422498375217:web:1126d970c56f3041182710",
  measurementId: "G-QH6L8PCYDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);