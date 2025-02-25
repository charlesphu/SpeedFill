// authentication functions

import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function signIn(email, password) {
  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    // router.push("/"); -- change pages?
  } catch (error) {
    setError(
      `${isLogin ? "Login" : "Signup"} failed. Email: ${email} - Error: ${
        error.message
      }`
    );
  }
  return true; // signal that signIn was succesful
}
