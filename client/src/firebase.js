import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLnAOLXrVAZ9TGGUDKD8D_8EynuMngLvA",
  authDomain: "se-project-d9297.firebaseapp.com",
  projectId: "se-project-d9297",
  storageBucket: "se-project-d9297.appspot.com",
  messagingSenderId: "392172437414",
  appId: "1:392172437414:web:9212d1003666183da21967",
  measurementId: "G-4PLEB4MYXD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
