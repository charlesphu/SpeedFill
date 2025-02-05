import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
  try {
    const body = await request.json(); // Parse the JSON body
    const { resume, isPDF, jobDesc, isURL, appQuestion } = body;
    // console.log(`${resume},${jobDesc},${isURL},${appQuestion}`)
    if (!resume || !jobDesc || !appQuestion) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 } // Bad Request
      );
    }

    var actualJD = jobDesc
    // webscraping
    if (isURL) {
      // webscrape the URL
    }

    if (isPDF) {
      // extract content from pdf
    }

    var prompt = `Given my resume: ${resume}, 
            answer this ${appQuestion}, 
            in a way that it fits ${actualJD}`;
    
    console.log("Prompt: ", prompt);

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    return NextResponse.json(result.response.text());
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
// export async function POST(request) {
//     const apiKey = process.env.GEMINI_API_KEY; // Securely accessed on the server

//     if (!apiKey) {
//       return NextResponse.json({ error: 'API key not found.' }, { status: 500 });
//     }

//     // // Example of making a request to the Gemini API
//     // const res = await fetch('https://gemini-api.example.com', {
//     //   method: 'POST',
//     //   headers: {
//     //     Authorization: `Bearer ${apiKey}`,
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(await request.json()), // Pass client data
//     // });

//     const data = await res.json();
//     return NextResponse.json(data);
//   }

// import GeminiAPI from 'gemini-api'
// // System prompt for the AI, providing guidelines on how to respond to users

// // POST function to handle incoming requests
// export async function POST(req) {
//     const client = new GeminiAPI({
//         key: process.env.GEMINI_API_KEY, // Your Gemini API key
//         secret: process.env.GEMINI_API_SECRET, // Your Gemini API secret
//         sandbox: true, // Set to false for production
//     });

//     const data = await req.json();

//     let response;
//     try {
//         // Determine the type of request from the incoming data
//         if (data.type === 'balance') {
//             // Fetch account balances
//             response = await client.getBalance();
//         } else if (data.type === 'order') {
//             // Place a new order
//             const { symbol, amount, price, side } = data;
//             response = await client.newOrder({
//                 symbol,
//                 amount,
//                 price,
//                 side,
//                 type: 'exchange limit', // You can change this to other types as needed
//             });
//         } else {
//             throw new Error('Invalid request type');
//         }
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     // Return the response as JSON
//     return NextResponse.json(response);
// }

// import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API
// const systemPrompt = `You are to summarize fed notes in a more understandable manner`// Use your own system prompt here

// POST function to handle incoming requests for OPEN AI
// export async function POST(req){
//     const openai = new OpenAI({
//         baseURL:"https://openrouter.ai/api/v1",
//         apiKey: process.env.OPENROUTER_API_KEY,
//     });
//     const data = await req.json()

//     const completion = await openai.chat.completions.create({
//         messages: [
//             { role: "system", content: systemPrompt },
//             data, // Directly add the single object
//         ],
//         model: "openai/gpt-3.5-turbo",
//         stream: true,
//     });

//     const stream = new ReadableStream({
//         async start(controller) {
//             const encoder = new TextEncoder()
//             try {
//                 for await (const chunk of completion) {
//                     const content = chunk.choices[0].delta.content
//                     if (content) {
//                         const text = encoder.encode(content)
//                         controller.enqueue(text)
//                     }
//                 }
//             } catch (error) {
//                 controller.error(err)
//             } finally {
//                 controller.close()
//             }
//         },
//     })

//     return new NextResponse(stream);

// }
