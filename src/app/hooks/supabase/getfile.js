import { generatePDF } from "../pdfToText";
import { supabase, getUserID } from "./auth";
// import { getFile } from "./uploadfile";

export async function getMostRecentResponse(type) {
  const userid = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userid)
    .eq("type", type) // Filter by type
    .not("response", "is", null) // Ensure content is not NULL (if needed)
    .order("time", { ascending: false }) // Sort by timestamp descending
    .limit(1); // Get only the latest record

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data.length ? JSON.parse(data[0].response) : null;
}

export async function getFile(file) {
  const userId = await getUserID();
  const { data } = supabase.storage.from("filesStorage").getPublicUrl(file); // change to createSignedUrl
  return data;
}

export async function getUserHistory() {
  const userId = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userId)
    .order("time", { ascending: false });

  // jsonArray = jsonArray.map(person => ({
  //   ...person,
  //   age: person.age + 1
  // }));
  console.log("test", data);
  const responseBlob = await generatePDF(`${item.response}`); // Await the PDF generation
  const pdfUrl = URL.createObjectURL(responseBlob); // Create a URL from the blob
  const responseSize = `${(responseBlob.size / 1024 / 1024).toFixed(2)} MB`; // Get the size in bytes
  var results = await Promise.all(
    data.map(async (item) => ({
      ...item,
      resumeFileSrc: await getFile(`${userId}/${item.filepath}`),
      responseURL: pdfUrl, // Add the URL
      responseSize: responseSize,
    }))
  );

  // results =

  return results;
}

export async function getResponseById(id) {
  const userid = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userid)
    .eq("uniqueID", id)
    .not("response", "is", null) // Ensure content is not NULL (if needed)
    .order("time", { ascending: false }); // Sort by timestamp descending

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data.length ? JSON.parse(data[0].response) : null;
}
