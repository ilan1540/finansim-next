// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAiC0srFm_wT2BGq6FsLE2maBOLb_1nso",
  authDomain: "finansim-70cb4.firebaseapp.com",
  databaseURL: "https://finansim-70cb4.firebaseio.com",
  projectId: "finansim-70cb4",
  storageBucket: "finansim-70cb4.firebasestorage.app",
  messagingSenderId: "1051700057263",
  appId: "1:1051700057263:web:6f10e3f0d298a77065705a"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const db = getFirestore(app)
