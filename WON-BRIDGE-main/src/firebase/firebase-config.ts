// src/firebase/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK8iXBbyUwy0PzPWRmbNt6-YI8CVrPHYQ",
  authDomain: "mobile-sms-1d137.firebaseapp.com",
  projectId: "mobile-sms-1d137",
  storageBucket: "mobile-sms-1d137.appspot.com",
  messagingSenderId: "755193950827",
  appId: "1:755193950827:web:4535278a7be7c74dcb772e",
  measurementId: "G-9MND7LL9DR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
