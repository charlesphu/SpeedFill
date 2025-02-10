import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "speedfil11.firebaseapp.com",
    projectId: "speedfil11",
    storageBucket: "speedfil11.firebasestorage.app",
    messagingSenderId: "253486869884",
    appId: "1:253486869884:web:fc64a93360c3c4ecbb88f9",
    measurementId: "G-MF7GDSNB67"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
