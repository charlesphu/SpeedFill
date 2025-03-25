import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
export default async function webscraper(url) {
  // Fetch and load HTML of the page
  console.log("entered");
  let fullPageContent;
  try {
    const { data: jobPostData } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    const $ = cheerio.load(jobPostData);
    fullPageContent = $.html();
  } catch (error) {
    console.error("error");
    throw new Error("Fail to request job details URL");
  }
  return fullPageContent;
}
