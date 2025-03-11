"use client";
import { useState, useEffect } from "react";

import { uploadEntry } from "./supabase/uploadfile";
import { generatePDF, pdfToText } from "./pdfToText";

export default function useAIPrompt() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [lastRequestTime, setLastRequestTime] = useState(
  //   () => localStorage.getItem("lastRequestTime") || null
  // );
  const [cooldownMessage, setCooldownMessage] = useState("");

  const cooldownDuration = 60000; // 60 sec

  useEffect(() => {
    // const savedTime = localStorage.getItem("lastRequestTime");
    // if (savedTime) {
    //   setLastRequestTime(parseInt(savedTime, 10));
    // }
  }, []);

  const handleGenerateCoverLetter = async (
    resumeData,
    jobDescription,
    additionalDetails
  ) => {
    setLoading(true);
    var result;
    var resumeText;
    if (resumeData.file == null) {
      resumeText = resumeData.text;
      const resumeBlob = await generatePDF(resumeData.text);
      const pdfFile = new File([resumeBlob], "copy-paste-resume.pdf", {
        type: "application/pdf",
      });
      resumeData = { ...resumeData, file: pdfFile };
      resumeData = resumeData.file;
    } else {
      resumeText = await pdfToText(URL.createObjectURL(resumeData.file));
      resumeData = resumeData.file;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "coverLetter",
          resume: resumeText,
          jobDesc: jobDescription.text,
          jobURL: jobDescription.url,
          additionalDetails: additionalDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      result = await response.json();
      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      uploadEntry(resumeData, "Cover Letter", result);
      setLoading(false);
    }
  };

  const handleAnalyzeResume = async (
    resumeData,
    jobDescription,
    additionalDetails
  ) => {
    setLoading(true);
    var result;
    var resumeText;
    if (resumeData.file == null) {
      resumeText = resumeData.text;
      const resumeBlob = await generatePDF(resumeData.text);
      const pdfFile = new File([resumeBlob], "copy-paste-resume.pdf", {
        type: "application/pdf",
      });
      resumeData = { ...resumeData, file: pdfFile };
      resumeData = resumeData.file;
    } else {
      resumeText = await pdfToText(URL.createObjectURL(resumeData.file));
      resumeData = resumeData.file;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "analyzeResume",
          resume: resumeText,
          jobDesc: jobDescription.text,
          jobURL: jobDescription.url,
          additionalDetails: additionalDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("AI Response:", data);
      setResponse(
        typeof data === "string" ? data : JSON.stringify(data, null, 2)
      );

      result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "An unknown error occurred.");
    } finally {
      uploadEntry(resumeData, "Resume Analysis", result);
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    cooldownMessage,
    handleGenerateCoverLetter,
    handleAnalyzeResume,
  };
}
