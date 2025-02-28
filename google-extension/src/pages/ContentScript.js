// This will be run in the context of the webpage to extract text

function extractVisibleText() {
  let text = document.body.innerText;

  // Send the text back to the extension
  chrome.runtime.sendMessage({
    action: "extractedText",
    text: text,
  });

  // Optional: You can also show a notification on the page
  const notification = document.createElement("div");
  notification.textContent = "Text extracted for SpeedFill!";
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.backgroundColor = "#4D7940";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "10000";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

extractVisibleText();
