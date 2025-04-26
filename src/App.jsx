import React, { useState, useEffect } from "react";
import { Sugar } from "react-preloaders";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AntLogic from "./pages/Projects/Antlogic/Antlogic";
import ICSYAK from "./pages/Projects/ICSYAK/ICSYAK";
import Splitter from "./pages/Splitter/Splitter";
import KTANE from "./pages/KTANE/KTANE";
import CheckersAI from "./pages/Projects/CheckersAI/CheckersAI";

import { preloadImages } from "./utils/preloadimages";

function AnimatedRoutes({ shetr, toggleShetr }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home shetr={shetr} toggleShetr={toggleShetr} />} />
        <Route path="/splitter" element={<Splitter />} />
        <Route path="/ktane" element={<KTANE />} />
        <Route path="/projects/antlogic" element={<AntLogic />} />
        <Route path="/projects/ICSYAK" element={<ICSYAK />} />
        <Route path="/projects/CheckersAI" element={<CheckersAI />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [shetr, setShetr] = useState(false);

  const toggleShetr = () => setShetr((prev) => !prev);

  useEffect(() => {
    async function loadImages() {
      try {
        await preloadImages();
      } catch (error) {
        console.error("Error preloading images:", error);
      }
      setLoading(false);
    }
    loadImages();
  }, []);

  return (
    <Router>
      <Sugar
        customLoading={loading}
        background="var(--color-neutral)"
        color="var(--color-neutral-content)"
      />

      <Navbar shetr={shetr} />

      <AnimatedRoutes shetr={shetr} toggleShetr={toggleShetr} />

      <Footer shetr={shetr} />
    </Router>
  );
}

export default App;