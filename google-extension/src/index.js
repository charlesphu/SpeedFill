import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log("Loading index.js");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<App />);
});
