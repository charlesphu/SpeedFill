import { pdfToText } from "../hooks/pdfToText";

// constants fo the minimum length
const minLength = 25;
// regex for the keywords that are expected in the job description
const workKeywordsRegex = new RegExp(
  "manager|developer|engineer|designer|market|product|owner|data|job|description" +
    "manager|customer support|sales|hr|writer|coordinator|" +
    "analyst|develop|manage|design|lead|coordinate|support|implement|create|analyze|execute|" +
    "build|collaborate|monitor|evaluate|optimize|maintain|track|improve|facilitate|review|test|drive|" +
    "communication|problem-solving|leadership|teamwork|critical thinking|time management|attention to detail|" +
    "project management|customer service|technical expertise|adaptability|creativity|multitasking|conflict resolution|" +
    "presentation skills|negotiation|analytical skills|javascript|react|node.js|python|ruby|photoshop|" +
    "degree|diploma|bachelor|master|phd|certified|experience|" +
    "fluent|licensing|credentials|years of experience|self-motivated|proven track record|strong foundation in|" +
    "expertise|familiarity|fast-paced|dynamic|collaborative|remote|hybrid|team-oriented|detail-oriented|" +
    "flexible|deadline-driven|results-oriented|creative environment|growth-oriented|full-time|part-time|contract|" +
    "intern|on-site|hybrid|temporary|permanent|entry-level|mid-level|senior-level|experience|work history|" +
    "employment|work",
  "i"
);

// checks if the resume is valid using regex values
export const validResume = async (file) => {
  let text = null;
  if (file.file != null) {
    text = await pdfToText(URL.createObjectURL(file.file));
  } else {
    text = file.text;
  }
  const hasExperience = /experience|work history|employment|work/i.test(text);
  const hasEducation = /education|degree|university|college|school/i.test(text);
  const hasSkills = /skill|abilities|proficiencies|certification|project/i.test(
    text
  );
  if (text.length < minLength) {
    return `Your resume is too short. Please upload a resume that is at least ${minLength} characters long.`;
  }
  if (!hasExperience && !hasEducation && !hasSkills) {
    return `Your resume does not contain any experience, education, or skills. Please upload a resume that contains at least one of these sections.`;
  }
  return "Success";
};

// checks if the Job description is valid using regex values
export async function validJobDescription(jobDescription) {
  let content = "";
  if (jobDescription.url !== "") {
    let response;
    try {
      response = await fetch("/api/scraper", {
        method: "POST",
        body: JSON.stringify({ url: jobDescription.url }),
      });
    } catch (error) {
      return "Invalid URL. Please provide a valid job description URL.";
    }

    console.log("response: ", response);
    if (!response.ok) {
      return "Invalid URL. Please provide a valid job description URL.";
    }
    response = await response.json();
    content = response.message;
  } else if (jobDescription.text !== "") {
    content = jobDescription.text;
  }
  const hasKeyWords = workKeywordsRegex.test(content);
  if (content.length < minLength) {
    return `Job description is too short. Please upload a Job description that is at least ${minLength} characters long.`;
  }
  if (!hasKeyWords) {
    return `The job description does not contain any relevant keywords. Please provide a valid job description.`;
  } else {
    return "Success";
  }
}
