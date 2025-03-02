// import pdfjs-dist;
import * as pdfjsLib from "pdfjs-dist";
import { getDocument } from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";
import { jsPDF } from "jspdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const generatePDF = (text) => {
  const doc = new jsPDF();

  // Add text to PDF
  doc.text(text, 10, 10);
  const pdfBlob = doc.output("blob");

  return pdfBlob;
};

export async function pdfToText(pdfUrl) {
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
