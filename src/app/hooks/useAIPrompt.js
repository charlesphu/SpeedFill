import { useState, useEffect } from "react";

export default function useAIPrompt() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(
    () => localStorage.getItem("lastRequestTime") || null
  );
  const [cooldownMessage, setCooldownMessage] = useState("");

  const cooldownDuration = 60000; // 60 sec

  useEffect(() => {
    const savedTime = localStorage.getItem("lastRequestTime");
    if (savedTime) {
      setLastRequestTime(parseInt(savedTime, 10));
    }
  }, []);

  const checkCooldown = () => {
    const now = Date.now();
    const lastRequestTime = localStorage.getItem("lastRequestTime");

    if (lastRequestTime && now - lastRequestTime < cooldownDuration) {
      const timeLeft = ((cooldownDuration - (now - lastRequestTime)) / 1000).toFixed(0);
      setCooldownMessage(`Please wait ${timeLeft} seconds before submitting again.`);
      return false;
    }

    setCooldownMessage(""); // Clear message if cooldown is over
    localStorage.setItem("lastRequestTime", now);
    return true;
  };

  const handleGenerateCoverLetter = async (
    resumeText,
    isPDF,
    jobDescription,
    isURL,
    applicationQuestion
  ) => {
    if (!checkCooldown()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "coverLetter",
          resume: resumeText,
          isPDF: isPDF,
          jobDesc: jobDescription,
          isURL: isURL,
          appQuestion: applicationQuestion,
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

  const handleAnalyzeResume = async (
    resumeText,
    isPDF,
    jobDescription,
    isURL,
    applicationQuestion
  ) => {
    if (!checkCooldown()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "analyzeResume",
          resume: resumeText,
          isPDF: isPDF,
          jobDesc: jobDescription,
          isURL: isURL,
          appQuestion: applicationQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("AI Response:", data);
      setResponse(typeof data === "string" ? data : JSON.stringify(data, null, 2));

    } catch (error) {
      console.error("API Error:", error)
      setError(error.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, cooldownMessage, handleGenerateCoverLetter, handleAnalyzeResume };
}
