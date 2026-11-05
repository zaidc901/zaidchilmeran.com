import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
// Load routes together so open tabs never request deleted page chunks after a deployment.
import Research from "./Research.jsx";
import Resources from "./Resources.jsx";
import VentureCalculator from "./VentureCalculator.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/research" element={<Research />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/venture" element={<VentureCalculator />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
