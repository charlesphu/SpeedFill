import { supabase, getUserID } from "./auth";

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

export async function getUserHistory() {
  const userId = await getUserID();
  const { data, error } = await supabase
    .from("userData")
    .select("*")
    .eq("user_id", userId);
  console.log(data);
}
