"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResumeAnalysis from "./ResumeAnalysis";
import CoverLetter from "./CoverLetter";

const Result = ({ ...props }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return type === "resume" ? (
    <ResumeAnalysis {...props} />
  ) : (
    <CoverLetter {...props} />
  );
};

export default function ParentComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Result />
    </Suspense>
  );
}

//test
// export ParentComponent;
