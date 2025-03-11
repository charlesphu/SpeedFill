import { getUserID, supabase } from "./auth";
import { getFile } from "./getfile";
import { v4 } from "uuid";

// Function to upload an entry to the database
// we get userID, upload the file, and then insert the data into the database
// we also make sure that the file is uploaded before we return
export async function uploadEntry(file, type, response) {
  const userId = await getUserID();
  const timeStamp = new Date().toISOString();
  await uploadFile(file, timeStamp);
  const { data, error } = await supabase.from("userData").insert([
    {
      user_id: userId,
      type: type,
      filepath: `${timeStamp}-${file.name}`,
      response: response,
      time: timeStamp,
      uniqueID: v4(),
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error.message);
    return { error };
  }

  // we make sure that the file is uploaded before we return
  await getFile(`${userId}/${timeStamp}-${file.name}`);
}

// Function to upload a file to the storage bucket
// get the userId, and upload the file to the storage bucket
export async function uploadFile(file, time) {
  const userId = await getUserID();

  const { data, databaseError } = await supabase.storage
    .from("filesStorage")
    .upload(`${userId}/${time}-${file.name}`, file);
  if (databaseError) {
    console.error(error.message);
    return { databaseError };
  } else {
    return 0;
  }
}

// Function to set the current resume file
// we get the userID, delete the current resume, and then upload the new file
export async function setCurrentResume(file) {
  // Ensure file is provided
  if (!file) {
    console.error("No file provided");
    return { error: "No file provided" };
  }

  // Get user
  const userId = await getUserID();

  // delete everything under the folder
  deleteCurrentResume();
  const timeStamp = new Date().toISOString();
  const filePath = `${userId}/${timeStamp}currentResume.pdf`;

  // Upload file
  var { data, error } = await supabase.storage
    .from("currentResume")
    .upload(filePath, file);

  if (error) {
    console.error(error.message);
    return { error };
  }

  getCurrentResume();
}

// Function to get the current resume file URL
// we get the userID, and then get the first file in the currentResume folder
// we return the public URL of the file
export async function getCurrentResume() {
  const userId = await getUserID();
  var bucketName = "currentResume";
  var folderPath = userId;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath);

  if (!data || data.length === 0) {
    return null;
  }
  if (error) {
    console.error("Error listing files:", error);
    return null;
  }

  const firstFile = data[0];
  const filePath = `${folderPath}/${firstFile.name}`;

  const publicUrl = supabase.storage.from(bucketName).getPublicUrl(filePath)
    .data.publicUrl;

  return publicUrl;
}

// Function to open the current resume file in a new tab
// we get the current resume URL and open it in a new tab
export async function openCurrentResume() {
  const url = await getCurrentResume();
  if (url == null) {
    return;
  }
  window.open(url, "_blank");
}

// Function to delete the current resume file
// we get the userID, and delete everything under the currentResume folder
export async function deleteCurrentResume() {
  const userId = await getUserID();

  var bucketName = "currentResume";
  var folderPath = userId;
  var { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath);

  if (error) {
    console.error("Error listing files:", error);
    return;
  }

  if (!data || data.length === 0) {
    return;
  }

  const filePaths = data.map((file) => `${folderPath}/${file.name}`);
  const { error: deleteError } = await supabase.storage
    .from(bucketName)
    .remove(filePaths);

  if (deleteError) {
    console.error("Error deleting files:", deleteError);
  }
}
