import { auth, storage } from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { pdfToText } from "../pdfToText";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
// import {
//   handleGenerateCoverLetter,
//   handleAnalyzeResume,
// } from "../hooks/useAIPrompt";

// upload the pdf with the url and the type
export async function uploadPDF(pdfUrl, type) {
  var text = await pdfToText(pdfUrl);
  const user = auth.currentUser;
  const uid = user.uid;
  var response;
  if (type == "resume-analysis") {
    response = handleAnalyzeResume(text);
  } else if (type == "cover-letter") {
    response = handleGenerateCoverLetter(text);
  }
  try {
    const userCollection = collection(db, "users", uid, "entries"); // Store under user's entries
    await addDoc(userCollection, {
      timestamp: serverTimestamp(), // Firestore's built-in timestamp
      text: text,
      type: type,
      role: "N/A",
      response: response,
    });
    console.log("Text stored successfully!");
  } catch (error) {
    console.error("Error storing text:", error.message);
  }
}

// get a list of all the pdfs that have been uploaded
export async function getPDF(uid) {
  try {
    const user = auth.currentUser;
    const uid = user.uid;
    const entriesRef = collection(db, "users", uid, "entries"); // Reference to the user's entries
    // const q = query(entriesRef, orderBy("timestamp", "desc")); // Order by timestamp (newest first)

    const querySnapshot = await getDocs(entriesRef);

    let entries = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data);
      entries.push({ id: doc.id, ...doc.data() }); // Include document ID
    });

    console.log("User entries:", entries);
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error.message);
    return [];
  }
}

// old pdf upload
// export async function uploadPDF2(file, type) {
//   if (type != "resume" && type != "cover letter") {
//     throw new Error("invaid file type");
//   }
//   const user = auth.currentUser;
//   if (!user) throw new Error("User not logged in");

//   const storageRef = ref(storage, `users/${user.uid}/${type}/${file.name}`);
//   await uploadBytes(storageRef, file);
//   const downloadURL = await getDownloadURL(storageRef);

//   console.log("File uploaded:", downloadURL);

//   // saving metadata of file

//   try {
//     // Upload the file
//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);
//     setMessage(`File uploaded successfully! Download URL: ${downloadURL}`);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     setMessage("Error uploading file. Please try again.");
//   }
//   // const pdfRef = doc(db, `users/${user.uid}/${type}/${fileName}`);
//   // await setDoc(pdfRef, {
//   //   name: fileName,
//   //   url: downloadURL,
//   //   uploadedAt: new Date(),
//   // });

//   console.log("Metadata saved in Firestore");

//   return downloadURL;
// }

// export async function getPDF2(type) {
//   const user = auth.currentUser;
//   if (!user) throw new Error("User not logged in");

//   const querySnapshot = await getDocs(
//     collection(db, `users/${user.uid}/${type}`)
//   );
//   return querySnapshot.docs.map((doc) => doc.data());
// }

// export async function savePDFMetadata(fileName, downloadURL) {
//   const user = auth.currentUser;
//   if (!user) throw new Error("User not logged in");
//   const storage = getStorage();
//   const pdfRef = ref(storage, fileName);
//   // const pdfRef = addDoc(db, `users/${user.uid}/entries/4YDjQUZ2iFEH2yhvf1hZ`);
//   await uploadBytes(pdfRef, downloadURL);

//   console.log("Metadata saved in Firestore");
// }
