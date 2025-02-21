"use client";

import { useSearchParams } from "next/navigation";

import ResumeAnalysis from "./ResumeAnalysis";
import CoverLetter from "./CoverLetter";

const Result = ({ ...props }) => {
  const searchParams = useSearchParams();
  return searchParams.get("type") === "resume" ? (
    <ResumeAnalysis {...props} />
  ) : (
    <CoverLetter {...props} />
  );
};

export default Result;
