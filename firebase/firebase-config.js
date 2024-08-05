import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr3lnwM5NIIzDqu8svwC0RYtsOtwFtu2U",
  authDomain: "onboarding-comm-unity.firebaseapp.com",
  projectId: "onboarding-comm-unity",
  storageBucket: "onboarding-comm-unity.appspot.com",
  messagingSenderId: "1079269076381",
  appId: "1:1079269076381:web:1c43d2cae92abeabf69374"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, auth, db };