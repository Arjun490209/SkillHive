
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "loginskillhive.firebasestorage.app",
  messagingSenderId: "258516942746",
  appId: "1:258516942746:web:98e9120d20543aff9b4423"
};


const app = initializeApp(firebaseConfig);



const auth = getAuth(app); 
const provider = new GoogleAuthProvider();

export { auth, provider };