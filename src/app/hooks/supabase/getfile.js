import { generatePDF } from "../pdfToText";
import { supabase, getUserID } from "./auth";

export async function getMostRecentResponse(type) {
  const userid = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userid)
    .eq("type", type)
    .not("response", "is", null)
    .order("time", { ascending: false })
    .limit(1);

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

  console.log("test", data);
  var results = await Promise.all(
    data.map(async (item) => {
      const responseBlob = await generatePDF(`${item.response}`);
      const pdfUrl = URL.createObjectURL(responseBlob);
      const responseSize = `${(responseBlob.size / 1024 / 1024).toFixed(2)} MB`;
      return {
        ...item,
        resumeFileSrc: await getFile(`${userId}/${item.filepath}`),
        responseURL: pdfUrl,
        responseSize: responseSize,
      };
    })
  );

  return results;
}

export async function getResponseById(id) {
  const userid = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userid)
    .eq("uniqueID", id)
    .not("response", "is", null)
    .order("time", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data.length ? JSON.parse(data[0].response) : null;
}
