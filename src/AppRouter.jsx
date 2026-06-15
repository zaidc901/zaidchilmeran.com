import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";

const Research = lazy(() => import("./Research.jsx"));
const Resources = lazy(() => import("./Resources.jsx"));
const VentureCalculator = lazy(() => import("./VentureCalculator.jsx"));

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="route-loader" role="status">Loading page...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<Research />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/venture" element={<VentureCalculator />} />
      </Routes>
    </Suspense>
  );
}
