import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Sugar } from "react-preloaders";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

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
import Calculator from "./pages/Calculator/Calculator";
import Blog from "./pages/Blog/Blog";
import ICSYAKBot from "./pages/Blog/posts/ICSYAKBot";
import AntlogicDesign from "./pages/Blog/posts/AntlogicDesign";
import CheckersAIMinimax from "./pages/Blog/posts/CheckersAIMinimax";
import HexamazeNotes from "./pages/Blog/posts/HexamazeNotes";
import OpenlabSetup from "./pages/Blog/posts/OpenlabSetup";
import Achievements from "./pages/Achievements/Achievements";
import MotionCursor from "./components/MotionCursor/MotionCursor";

function AnimatedRoutes({ shetr, toggleShetr }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home shetr={shetr} toggleShetr={toggleShetr} />} />
        <Route path="/splitter" element={<Splitter />} />
        <Route path="/ktane" element={<KTANE />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/projects/antlogic" element={<AntLogic />} />
        <Route path="/projects/ICSYAK" element={<ICSYAK />} />
        <Route path="/projects/CheckersAI" element={<CheckersAI />} />
        <Route path="/projects/splitter" element={<Splitter />} />
        <Route path="/projects/calculator" element={<Calculator />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/building-icsyak-discord-bot" element={<ICSYAKBot />} />
        <Route path="/blog/antlogic-puzzle-pathfinding-design" element={<AntlogicDesign />} />
        <Route path="/blog/checkers-ai-minimax-style" element={<CheckersAIMinimax />} />
        <Route path="/blog/hexamaze-notes-ktane-module" element={<HexamazeNotes />} />
  <Route path="/blog/setting-up-openlab" element={<OpenlabSetup />} />
    <Route path="/achievements" element={<Achievements />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

AnimatedRoutes.propTypes = {
  shetr: PropTypes.bool.isRequired,
  toggleShetr: PropTypes.func.isRequired,
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [shetr, setShetr] = useState(false);
  const isNotMobile = useMediaQuery({ minWidth: 640 });

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

  useEffect(() => {
    const titles = ["Y", "Yo", "You", "Yous", "Youse", "Yousef", "Yousef K", "Yousef Kh", "Yousef Kha", "Yousef Khan", "Yousef Kha", "Yousef Kh", "Yousef K", "Yousef", "Youse", "Yous", "You", "Yo", "Y", "YK", "YKa", "YKaw", "YKawe", "YKawes", "YKaweso", "YKawesom", "YKawesome", "YKawesom", "YKaweso", "YKawes", "YKawe", "YKaw", "YKa", "YK"];
    let index = 0;

    const interval = setInterval(() => {
      document.title = titles[index];
      index = (index + 1) % titles.length;
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Sugar
        customLoading={loading}
        background="var(--color-neutral)"
        color="var(--color-neutral-content)"
      />

      {isNotMobile && (
        <MotionCursor
          innerSize={12}
          outerSize={36}
          innerScale={1}
          outerScale={2}
          hasBlendMode={true}
          clickables={[
            'a',
            'button',
            'img[class*="clickable"]',
            'div[class*="clickable"]',
            'div[role="button"]',
          ]}
          showSystemCursor={false}
          innerStyle={{
            backgroundColor: "var(--cursor-color)",
          }}
          outerStyle={{
            backgroundColor: "var(--cursor-color)",
            mixBlendMode: "overlay",
          }}
        />
      )}

      <Navbar shetr={shetr} />

      <AnimatedRoutes shetr={shetr} toggleShetr={toggleShetr} />

      <Footer shetr={shetr} />
    </Router>
  );
}

export default App;