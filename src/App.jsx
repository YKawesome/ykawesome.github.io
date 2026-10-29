import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./motion.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

// Project code and assets are downloaded only when that page is opened.
const AntLogic = lazy(() => import("./pages/Projects/Antlogic/Antlogic"));
const ICSYAK = lazy(() => import("./pages/Projects/ICSYAK/ICSYAK"));
const Splitter = lazy(() => import("./pages/Splitter/Splitter"));
const KTANE = lazy(() => import("./pages/KTANE/KTANE"));

function ScrollToLocation() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToLocation />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" role="status">Loading project…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/splitter" element={<Splitter />} />
            <Route path="/ktane" element={<KTANE />} />
            <Route path="/calculator" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/antlogic" element={<AntLogic />} />
            <Route path="/projects/icsyak" element={<ICSYAK />} />
            <Route path="/projects/checkersai" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/splitter" element={<Splitter />} />
            <Route path="/projects/calculator" element={<Navigate to="/#projects" replace />} />
            <Route path="/blog/*" element={<Navigate to="/#projects" replace />} />
            <Route path="/achievements" element={<Navigate to="/" replace />} />
            <Route path="*" element={
              <div className="not-found">
                <p className="eyebrow">404 / A little off the path</p>
                <h1>This page isn’t here.</h1>
                <Link className="text-link" to="/">Back to home <span aria-hidden="true">↗</span></Link>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
