import { generatePDF } from "../pdfToText";
import { supabase, getUserID } from "./auth";

// data is structred in:
// userData: user_id, unique_id
// allData: unique_id, time, filepath (what resume), type, response
// entries: unique_id, time, jobURL, jobTitle, company, date, status

// Foreign key constraints ..
// userData.unique_id references allData.unique_id references entries.unique_id

// could rename entries to tracker
// entries exist to store additional data without needing to use Speedfill
// ie user just wants to keep track of what they done

/* Entry upload and retrieval*/

/* File upload and retrieval*/
