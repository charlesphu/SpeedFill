import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import axios from "axios";
import * as cheerio from "cheerio";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
  let final_response;

  try {
    const { type, resume, _, jobDesc, jobURL, additionalDetails } =
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

    if (type === "coverLetter") {
      prompt = `Generate a professional cover letter based on the following details:
      Resume: ${resume}
      Job Description: ${jobDetails}
      Additional Details: ${additionalDetails || "N/A"}

      Provide a response in JSON format with the following fields, ensure the response is valid JSON without additional text.
      {
        "cover_letter": (string)
      }`;
    } else if (type === "analyzeResume") {
      prompt = `Analyze the resume for this job and provide a structured JSON response:
      Resume: ${resume}
      Job Description: ${jobDetails}
      Additional Details: ${additionalDetails || "N/A"}

      Provide the following details:
      - Match percentage: How well the resume fits the job
      - Strengths: Key areas where the candidate excels
      - Areas for improvement: What needs to be improved in the resume based on job description
      - Interview questions: Provide 3 common generic behavioral interview questions with example answers.

      Provide a response in JSON format with the following fields, ensure the response is valid JSON without additional text.
      {
        "match_percentage": (integer, 0-100),
        "strengths": (array of strings),
        "areas_for_improvement": (array of strings),
        "interview_questions": [
          {
            "question": (string),
            "answer": (string)
          }
        ]
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
        { error: "AI response did not respond" },
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

      // Validate JSON response format
      try {
        aiResponse = JSON.parse(rawText);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        return NextResponse.json(
          { error: "Invalid JSON response from AI" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("AI Response JSON Parse Error:", error);
      return NextResponse.json(
        { error: "AI Response JSON Parse Error" },
        { status: 500 }
      );
    }

    final_response = NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    console.log("RETURNING RESPONSE:", final_response);
    return final_response;
  }
}
