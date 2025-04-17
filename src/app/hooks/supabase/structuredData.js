import { generatePDF } from "../pdfToText";
import { supabase, getUserID } from "./auth";

// data is structred in:
// userData: user_id, unique_id
// allData: unique_id, time, filepath (what resume), type, response
// entries: unique_id, time, jobURL, jobTitle, company, date, status

// buckets: (file storage)
// filesStorage: userid -> filename (timestamp-filename)

async function getFileURL(file) {
  const userId = await getUserID();
  const { data } = supabase.storage.from("filesStorage").getPublicUrl(file); // change to createSignedUrl
  return data;
}

// currentResume: userid -> filename (timestamp-filename)

async function getCurrentResumeURL() {
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

// Foreign key constraints ..
// userData.unique_id references allData.unique_id references entries.unique_id

// could rename entries to tracker
// entries exist to store additional data without needing to use Speedfill
// ie user just wants to keep track of what they done

/* Entry upload and retrieval*/
async function insertData() {}
/* File upload and retrieval*/

export { insertData };
