// File upload functions

import { storage, auth } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadPDF(file, type) {
  if (type != "resume" || type != "cover letter") {
    throw new Error("invaid file type");
  }
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const storageRef = ref(storage, `users/${user.uid}/${type}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  console.log("File uploaded:", downloadURL);

  // saving metadata of file
  const pdfRef = doc(db, `users/${user.uid}/${type}/${fileName}`);
  await setDoc(pdfRef, {
    name: fileName,
    url: downloadURL,
    uploadedAt: new Date(),
  });

  console.log("Metadata saved in Firestore");

  return downloadURL;
}

export async function getPDF(type) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const querySnapshot = await getDocs(
    collection(db, `users/${user.uid}/${type}`)
  );
  return querySnapshot.docs.map((doc) => doc.data());
}

// export async function savePDFMetadata(fileName, downloadURL) {
//     const user = auth.currentUser;
//     if (!user) throw new Error("User not logged in");

//     const pdfRef = doc(db, `users/${user.uid}/pdfs/${fileName}`);
//     await setDoc(pdfRef, {
//       name: fileName,
//       url: downloadURL,
//       uploadedAt: new Date(),
//     });

//     console.log("Metadata saved in Firestore");
//   }
