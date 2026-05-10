import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwHjsCBd7oean2tJ67u0SZq-Wg9VBstzg",
  authDomain: "jumia-blog.firebaseapp.com",
  projectId: "jumia-blog",
  storageBucket: "jumia-blog.firebasestorage.app",
  messagingSenderId: "601629053381",
  appId: "1:601629053381:web:8f5c27dd0da74634b2fbac",
  measurementId: "G-KXDL1G9Y5D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
