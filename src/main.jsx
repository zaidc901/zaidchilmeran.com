import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Research from "./Research.jsx";
import Resources from "./Resources.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<Research />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);