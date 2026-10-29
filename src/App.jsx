import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./motion.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

// Tool code and assets are downloaded only when a tools page is opened.
const Tools = lazy(() => import("./pages/Tools/Tools"));
const ToolPage = lazy(() => import("./pages/Tools/ToolPage"));

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
        <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:slug" element={<ToolPage />} />
            <Route path="/splitter" element={<Navigate to="/tools/banner-splitter" replace />} />
            <Route path="/projects/splitter" element={<Navigate to="/tools/banner-splitter" replace />} />
            <Route path="/ktane" element={<Navigate to="/tools" replace />} />
            <Route path="/calculator" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/antlogic" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/icsyak" element={<Navigate to="/#projects" replace />} />
            <Route path="/projects/checkersai" element={<Navigate to="/#projects" replace />} />
            {/* Linked from the resume. */}
            <Route path="/smart401k" element={<Navigate to="/#projects" replace />} />
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
