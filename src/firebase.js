// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-IkFTAR_-gy16V6w8sGQCfr13ByGTANY",
  authDomain: "toriko-food.firebaseapp.com",
  projectId: "toriko-food",
  storageBucket: "toriko-food.appspot.com",
  messagingSenderId: "179383735861",
  appId: "1:179383735861:web:ae21d1b98079b26679c37c",
  measurementId: "G-BQQXPSB6VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

export { db, app }; // Export Firestore instance
