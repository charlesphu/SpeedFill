import { createClient } from "@supabase/supabase-js";
// import { handleGenerateCoverLetter, handleAnalyzeResume } from "../useAIPrompt";
export const supabase = createClient(
  "https://nrkwgjlgdudnkyqxoglt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ya3dnamxnZHVkbmt5cXhvZ2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTk1MTYsImV4cCI6MjA1NTkzNTUxNn0.EWMcHnA4aiAAmv5y4IIz3xEuSr6zgg5XN3P5tWLc2PQ",
  {
    auth: { persistSession: true },
  }
);

// loginUser("charlesphu18@gmail.com", "test123");
// const { data: user } = await supabase.auth.getUser();
// if (!user) {
//   console.error("User must be logged in to upload files");
//   return;
// } else {
//   console.log("user is logged in");
// }

async function getUserID() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error(userError?.message || "User not found");
    return null;
  }
  const userId = userData.user.id;
  return userId;
}

export async function uploadEntry(file, type) {
  // get user data
  const userId = getUserID();

  // if (type == "resume-analysis") {
  //   response = handleAnalyzeResume(text);
  // } else if (type == "cover-letter") {
  //   response = handleGenerateCoverLetter(text);
  // }

  const timeStamp = new Date().toISOString();
  await uploadFile(file, timeStamp);
  const { data, error } = await supabase.from("userData").insert([
    {
      user_id: userId,
      type: type,
      filepath: `${timeStamp}-${file.name}`,
      response: "example response",
      time: timeStamp,
    },
  ]);

  getFile(`${userId}/${timeStamp}-${file.name}`);
  if (error) {
    console.error("Error inserting data:", error.message);
    return { error };
  }
}

// Upload file using standard upload
export async function uploadFile(file, time) {
  const userId = getUserID();

  const { data, databaseError } = await supabase.storage
    .from("filesStorage")
    .upload(`${userId}/${time}-${file.name}`, file);
  if (databaseError) {
    // Handle error
    console.error(error.message);
    return { databaseError };
  } else {
    // Handle success
    console.log("file uploaded succesfully");
    return 0;
  }
}

export async function setCurrentResume(file) {
  // Ensure file is provided
  if (!file) {
    console.error("No file provided");
    return { error: "No file provided" };
  }

  // Get user
  const userId = getUserID();

  // delete everything under the folder
  deleteCurrentResume();
  const timeStamp = new Date().toISOString();
  const filePath = `${userId}/${timeStamp}currentResume.pdf`; // Explicitly set extension

  // Upload file
  var { data, error } = await supabase.storage
    .from("currentResume")
    .upload(filePath, file);

  if (error) {
    console.error(error.message);
    return { error };
  }

  console.log("File uploaded successfully:", data);
  getCurrentResume();
}

export async function getCurrentResume() {
  const userId = getUserID();
  console.log("test", userId);
  var bucketName = "currentResume";
  var folderPath = userId;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath);

  if (!data || data.length === 0) {
    console.log("No files found in the folder.");
    return null;
  }
  if (error) {
    console.error("Error listing files:", error);
    return null;
  }

  const firstFile = data[0];
  const filePath = `${folderPath}/${firstFile.name}`;

  // Get the public URL
  const publicUrl = supabase.storage.from(bucketName).getPublicUrl(filePath)
    .data.publicUrl;

  console.log("First file public URL:", publicUrl);
  return publicUrl;
}

export async function openCurrentResume() {
  const url = await getCurrentResume();
  if (url == null) {
    return;
  }
  window.open(url, "_blank");
}

export async function deleteCurrentResume() {
  const userId = getUserID();

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
    console.log("No files found in the folder.");
    return;
  }

  // Create an array of file paths to delete
  const filePaths = data.map((file) => `${folderPath}/${file.name}`);
  console.log(filePaths);
  const { error: deleteError } = await supabase.storage
    .from(bucketName)
    .remove(filePaths);

  if (deleteError) {
    console.error("Error deleting files:", deleteError);
  } else {
    console.log("All files deleted successfully.");
  }
}

export async function getFile(file) {
  const userId = getUserID();
  const { data } = supabase.storage.from("filesStorage").getPublicUrl(file); // change to createSignedUrl
  console.log(data);
}

export async function getUserHistory() {
  const userId = getUserID();
  const { data, error } = await supabase
    .from("userData") // Replace with your actual table name
    .select("*")
    .eq("user_id", userId);
  console.log(userId);
  console.log(data);
}
// export async function downloadFile(file) {
//   const { data, error } = await supabase.storage
//     .from("filesStorage")
//     .download(`${userId}/123`, {
//       headers: {
//         Authorization: `Bearer ${userJWT}`,
//       },
//     });

//   if (error) {
//     console.error(error.message);
//   }
// }
