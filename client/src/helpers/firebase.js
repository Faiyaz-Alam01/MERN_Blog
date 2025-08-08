import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mernblog-644c9.firebaseapp.com",
  projectId: "mernblog-644c9",
  storageBucket: "mernblog-644c9.firebasestorage.app",
  messagingSenderId: "534216240752",
  appId: "1:534216240752:web:f737dee4c0128857b38eb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

// Force Google to show "Choose an account"
provider.setCustomParameters({
  prompt:"select_account"
})

export {auth, provider}