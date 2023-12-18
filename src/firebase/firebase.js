import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FB_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Authentication
const firebaseAuth = getAuth(firebaseApp);

// Firebase Authentication - google
const firebaseAuthGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(firebaseAuth, googleProvider);
}

// Firebase Authentication - github
const firebaseAuthGithub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(firebaseAuth, githubProvider);
}

// FireStore DB
const firebaseDataBase = getFirestore(firebaseApp);

export{ firebaseAuth, firebaseAuthGithub, firebaseDataBase, firebaseAuthGoogle }