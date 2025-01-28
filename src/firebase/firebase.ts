// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-mFa7XO6lxMWTh7_XNM2BNukfJ9eus4k",
    authDomain: "madrocket-assignment-e81b2.firebaseapp.com",
    projectId: "madrocket-assignment-e81b2",
    storageBucket: "madrocket-assignment-e81b2.firebasestorage.app",
    messagingSenderId: "842426066753",
    appId: "1:842426066753:web:d9a16a9add02fe964763c0",
    measurementId: "G-JVZZ7VM0F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {
    app, auth, db, collection, getDocs
}