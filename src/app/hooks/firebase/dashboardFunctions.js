import { storage, auth } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const getUser = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        resolve(user.email);
      } else {
        resolve(null);
        resolve("No user data");
      }
    });
  });
};
