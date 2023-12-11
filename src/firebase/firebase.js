import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

// Firebase Authentication - github
const firebaseAuthGithub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(firebaseAuth, githubProvider);
}

export{ firebaseAuth, firebaseAuthGithub }