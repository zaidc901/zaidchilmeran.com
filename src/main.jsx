import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Research from "./Research.jsx";
import Resources from "./Resources.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<Research />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);