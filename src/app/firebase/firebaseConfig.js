import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCCOel1gC1-UJIGranRugtgnPk3gyGcd-k",
  authDomain: "speedfil11.firebaseapp.com",
  projectId: "speedfil11",
  storageBucket: "speedfil11.firebasestorage.app",
  messagingSenderId: "253486869884",
  appId: "1:253486869884:web:fc64a93360c3c4ecbb88f9",
  measurementId: "G-MF7GDSNB67",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const storage = getStorage(app);

export { storage };
