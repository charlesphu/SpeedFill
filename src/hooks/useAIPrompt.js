import { useState } from "react";

export default function useAIPrompt() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPrompt = async (resumeText, isPDF, jobDescription, isURL, applicationQuestion) => {
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          resume: resumeText, 
          isPDF: isPDF,
          jobDesc: jobDescription,
          isURL: isURL,
          appQuestion: applicationQuestion
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendPrompt };
}
