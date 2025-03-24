import { pdfToText } from "../hooks/pdfToText";
export const isValidResume = async (file) => {
  let text = null;
  if (file.file != null) {
    text = await pdfToText(URL.createObjectURL(file.file));
  } else {
    text = file.text;
  }
  console.log(text);
  const minLength = 25;
  const hasExperience = /experience|work history|employment|work/i.test(text);
  const hasEducation = /education|degree|university|college|school/i.test(text);
  const hasSkills = /skill|abilities|proficiencies|certification|project/i.test(
    text
  );
  console.log(
    text.length,
    hasExperience,
    hasEducation,
    hasSkills,
    text.length > minLength && (hasExperience || hasEducation || hasSkills)
  );

  if (text.length < minLength) {
    return `Your resume is too short. Please upload a resume that is at least ${minLength} characters long.`;
  }
  if (!hasExperience && !hasEducation && !hasSkills) {
    return `Your resume does not contain any experience, education, or skills. Please upload a resume that contains at least one of these sections.`;
  }
  return "Success";
};

const workKeywordsRegex = new RegExp(
  "manager|developer|engineer|designer|market|product|owner|data|" +
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
    "internship|on-site|hybrid|temporary|permanent|entry-level|mid-level|senior-level|experience|work history|" +
    "employment|work",
  "i"
);

export const isValidJobDescription = async (jobDescription) => {
  let content = "";
  if (jobDescription.url !== "") {
    try {
      // Fetch and load HTML of the page
      const { data: jobPostData } = await axios.get(jobDescription.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      });

      const $ = cheerio.load(jobPostData);
      content = $.html();

      jobDetails = fullPageContent;
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Fail to request job details URL" },
        { status: 400 } // Bad Request
      );
    }
  } else if (jobDescription.text !== "") {
    content = jobDescription.text;
  }

  const lowerCaseText = text.toLowerCase();
  const foundWords = commonJobWords.filter((word) =>
    lowerCaseText.includes(word.toLowerCase())
  );

  if (foundWords.length > 0) {
    return "Success";
  } else {
    return "No common job description words found in the text.";
  }
};
