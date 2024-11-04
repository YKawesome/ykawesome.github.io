import React, { useEffect } from "react";
import { Sugar } from "react-preloaders";

import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {

  // Safari Support
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("preloader").classList.add("hide");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Footer />
      <Sugar background="oklch(var(--n))" color="oklch(var(--b1))" time={0}/>
    </React.Fragment>
  );
}

export default App;
