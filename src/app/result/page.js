"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResumeAnalysis from "./ResumeAnalysis";
import CoverLetter from "./CoverLetter";

// Result component that conditionally renders either ResumeAnalysis or CoverLetter
// based on the 'type' URL parameter
const Result = ({ ...props }) => {
  // Get the 'type' parameter from the URL query string
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Render ResumeAnalysis for 'resume' type, otherwise render CoverLetter
  return type === "resume" ? (
    <ResumeAnalysis {...props} />
  ) : (
    <CoverLetter {...props} />
  );
};

// Main page component that wraps Result with Suspense for handling loading states
export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Result />
    </Suspense>
  );
}
