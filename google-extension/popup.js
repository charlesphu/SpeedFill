document.getElementById("readText").addEventListener("click", async () => {
  console.log("hello");
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("test1");
  if (tab.id) {
    console.log("test2");
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["extractText.js"],
    });
  }
});
