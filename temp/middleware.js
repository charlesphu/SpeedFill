// // middleware.js
// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// // Load CORS settings from cors.json
// const corsConfigPath = path.join(process.cwd(), "cors.json");
// const corsConfig = JSON.parse(fs.readFileSync(corsConfigPath, "utf8"));

// export function middleware(request) {
//   const response = NextResponse.next();
//   const origin = request.headers.get("Origin");

//   if (corsConfig.allowedOrigins.includes(origin)) {
//     response.headers.set("Access-Control-Allow-Origin", origin);
//     response.headers.set(
//       "Access-Control-Allow-Methods",
//       corsConfig.allowedMethods.join(", ")
//     );
//     response.headers.set(
//       "Access-Control-Allow-Headers",
//       corsConfig.allowedHeaders.join(", ")
//     );
//   }

//   if (request.method === "OPTIONS") {
//     return NextResponse.json({}, { status: 200, headers: response.headers });
//   }

//   return response;
// }
