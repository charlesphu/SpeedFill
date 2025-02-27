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

export async function uploadEntry(file, type) {
  // get user data
  const { data: userData, userError: userError } =
    await supabase.auth.getUser();
  const userId = userData.user.id;
  if (userError) {
    // Handle error
    console.error(userError.message);
    return;
  }

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
  const { data: userData, userError: userError } =
    await supabase.auth.getUser();
  const userId = userData.user.id;
  if (userError) {
    // Handle error
    console.error(userError.message);
    return { userError };
  }
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

export async function getFile(file) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { userError };
  }
  const userId = userData.user.id;
  const { data } = supabase.storage.from("filesStorage").getPublicUrl(file); // change to createSignedUrl
  console.log(data);
}

export async function getUserHistory() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { userError };
  }
  const userId = userData.user.id;
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
