// import pdfjs-dist;
import * as pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function pdfToText(pdfUrl) {
  //   console.log("pdf parse");
  //   return;
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  // console.log(fullText);
  return fullText;
}

// pdfToText("your_pdf_url.pdf").then((text) => {
//   console.log(text);
// });
