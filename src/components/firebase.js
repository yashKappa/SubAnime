import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHg3UpmOWp4IV22dIgvWbv-ta8qg4-c-E",
  authDomain: "family-chat-54406.firebaseapp.com",
  databaseURL: "https://family-chat-54406-default-rtdb.firebaseio.com",
  projectId: "family-chat-54406",
  storageBucket: "family-chat-54406.firebasestorage.app",
  messagingSenderId: "14179860934",
  appId: "1:14179860934:web:67f3fe0fc6dc95bc7632c7",
  measurementId: "G-8H95Q12D01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase Auth
export const auth = getAuth(app);

// ✅ Firestore Database
export const db = getFirestore(app);

// ✅ AUTO LOGIN PERSISTENCE
setPersistence(auth, browserLocalPersistence);
