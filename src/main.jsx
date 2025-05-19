import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Halo from "./Halo.jsx"; // pastikan file ini sudah ada

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Form utama */}
        <Route path="/" element={<App />} />
        {/* Halaman Halo menerima param “nama” */}
        <Route path="/halo/:nama" element={<Halo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
