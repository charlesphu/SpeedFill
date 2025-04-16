import { createClient } from "@supabase/supabase-js";
import { supabase, getUserID, loginUser } from "./auth";

// Function to fetch all data from a specified table
export async function fetchAllData(tableName) {
  const userId = await getUserID();
  const { data, error } = await supabase
    .from(tableName)
    .from("entries")
    .select("*")
    .eq("user_id", userId)
    .order("time", { ascending: false });
  if (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
  return data;
}

export async function fetchDataByDate(date) {
  console.log("Fetching data by date...");
  const userId = await getUserID();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .order("time", { ascending: false });
  if (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
  return data;
}

export async function uploadEntry(url, jobTitle, company, date, time, status) {
  // const userId = await getUserID();
  let userId = await loginUser("test@mail.com", "test1234");
  // let userId = "8433650a-c9e4-4c70-a2bb-757706823b4a";

  const { data, error } = await supabase
    .from("entries")
    .insert([
      {
        user_id: userId,
        url: url,
        jobTitle: jobTitle,
        company: company,
        // date: null,
        // time: null,
        status: status,
      },
    ])
    .select("*");
  if (error) {
    console.error("Error uploading data:", error.message);
    return null;
  }
  return data;
}

export async function updateStatus(date, time, status) {
  const { data, error } = await supabase
    .from("entries")
    .update({ status: status })
    .eq("date", date)
    .eq("time", time)
    .select("*");
  if (error) {
    console.error("Error updating status:", error.message);
    return null;
  }
  return data;
}
