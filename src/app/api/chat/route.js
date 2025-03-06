import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
  try {
    const { type, resume, isPDF, jobDesc, isURL, additionalDetails } =
      await request.json(); // Parse the JSON body

    if (!resume || !jobDesc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 } // Bad Request
      );
    }

    let prompt = "";

    if (type == "coverLetter") {
      prompt = `Generate a professional cover letter based on the following details:
      Resume: ${resume}
      Job Description: ${jobDesc}
      Additional Details: ${additionalDetails || "N/A"}

      Respond in JSON format:
      {
        "cover_letter": "Your generated cover letter text"
      }`;
    } else if (type === "analyzeResume") {
      prompt = `Analyze the resume for this job and provide a structured JSON response:
      Resume: ${resume}
      Job Description: ${jobDesc}
      Additional Details: ${additionalDetails || "N/A"}

      Respond in JSON format:
      {
        "match_percentage": "X%",
        "strengths": ["strength 1", "strength 2", "strength 3"],
        "areas_for_improvement": ["improvement 1", "improvement 2", "improvement 3"],
        "overall_feedback": "A brief summary of the resume’s fit for the job."
      }`;
    } else {
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
