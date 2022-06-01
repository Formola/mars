import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBWMjvw_gMvP3MZ3rZmJHnOvlz5YfUzjM",
  authDomain: "terraforming-mars-c7834.firebaseapp.com",
  projectId: "terraforming-mars-c7834",
  storageBucket: "terraforming-mars-c7834.appspot.com",
  messagingSenderId: "822348649794",
  appId: "1:822348649794:web:08842e7c0ddc85d4cd24db"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
