import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import axios from "axios";
import * as cheerio from "cheerio";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// CHAN RENAME POST
export async function POST(request) {
  try {
    const { type, resume, isPDF, jobDesc, jobURL, additionalDetails } =
      await request.json(); // Parse the JSON body

    let jobDetails = jobDesc;

    if (jobURL) {
      try {
        // Fetch and load HTML of the page
        const { data: jobPostData } = await axios.get(jobURL, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          },
        });

        const $ = cheerio.load(jobPostData);
        const fullPageContent = $.html();

        jobDetails = fullPageContent;
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Fail to request job details URL" },
          { status: 400 } // Bad Request
        );
      }
    }

    if (!resume || !jobDetails) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 } // Bad Request
      );
    }

    let prompt = "";

    if (type == "coverLetter") {
      prompt = `Generate a professional cover letter based on the following details:
      Resume: ${resume}
      Job Description: ${jobDetails}
      Additional Details: ${additionalDetails || "N/A"}

      Respond in JSON format:
      {
        "cover_letter": "Your generated cover letter text"
      }`;
    } else if (type === "analyzeResume") {
      prompt = `Analyze the resume for this job and provide a structured JSON response:
      Resume: ${resume}
      Job Description: ${jobDetails}
      Additional Details: ${additionalDetails || "N/A"}

      Respond in JSON format:
      {
        "match_percentage": "X%",
        "strengths": ["strength 1", "strength 2", "strength 3"],
        "areas_for_improvement": ["improvement 1", "improvement 2", "improvement 3"],
        "overall_feedback": "A brief summary of the resume’s fit for the job."
      }`;
    } else {
      console.error("Invalid request type");
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
    }
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      return NextResponse.json(
        { error: "AI response failed" },
        { status: 500 }
      );
    }

    let aiResponse;
    try {
      let rawText = await result.response.text();
      rawText = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      aiResponse = JSON.parse(rawText);
    } catch (error) {
      console.error("AI Response JSON Parse Error:", error);
      aiResponse = { raw_response: await result.response.text() };
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
