function extractVisibleText() {
  console.log("test");
  let text = document.body.innerText; // Extracts only visible text
  console.log("Extracted Text:", text);
  alert(text.substring(0, 500)); // Show first 500 characters
}

// extractVisibleText();
