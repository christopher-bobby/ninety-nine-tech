import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./src/App";

// Get the root element from the DOM
const container = document.getElementById("root");

// Create a root for the app
const root = createRoot(container!); // Use non-null assertion (!) to ensure container is not null

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);