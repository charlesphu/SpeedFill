import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import axios from "axios";
import * as cheerio from "cheerio";
import { z } from "zod"; // Import Zod

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the Zod schema
const coverLetterSchema = z.object({
  cover_letter: z.string(),
});

const analyzeResumeSchema = z.object({
  match_percentage: z.string(),
  strengths: z.array(z.string()),
  areas_for_improvement: z.array(z.string()),
  overall_feedback: z.string(),
  interview_questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export { analyzeResumeSchema }; // Export the schema

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

    const interviewQuestions = [
      {
        question: "Tell me about yourself",
      },
      {
        question: "Why are you interested in this role?",
      },
    ];

    let prompt = "";

    if (type === "coverLetter") {
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

      Provide the following details:
      - Match percentage: How well the resume fits the job
      - Strengths: Key areas where the candidate excels
      - Areas for improvement: What needs to be improved in the resume
      - Overall feedback: Summary evaluation
      - Interview questions: Provide 3-5 commonly interview questions with well-thought-out answers.

      Respond in JSON format:
      {
        "match_percentage": "X%",
        "strengths": ["strength 1", "strength 2", "strength 3"],
        "areas_for_improvement": ["improvement 1", "improvement 2", "improvement 3"],
        "interview_questions": [
          {
            "question": "What are your greatest strengths?",
            "answer": "My greatest strengths are..."
          },
          {
            "question": "Can you describe a challenge you faced at work?",
            "answer": "One major challenge I faced was..."
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
      
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(rawText);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        return NextResponse.json(
          { error: "Invalid JSON response from AI" },
          { status: 500 }
        );
      }

      // Validate AI response using Zod schema
      try {
        if (type === "coverLetter") {
          aiResponse = coverLetterSchema.parse(parsedResponse);
        } else if (type === "analyzeResume") {
          aiResponse = analyzeResumeSchema.parse(parsedResponse);
        }
      } catch (error) {
        console.error("Zod Validation Error:", error);
        return NextResponse.json(
          { error: "Invalid data structure in AI response" },
          { status: 500 }
        );
      }

      return NextResponse.json(aiResponse);
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
