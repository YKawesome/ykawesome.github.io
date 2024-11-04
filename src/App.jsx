import React from "react";
import { Sugar } from "react-preloaders";

import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Footer />
      <Sugar background="oklch(var(--n))" color="oklch(var(--b1))" time={1000}/>
    </React.Fragment>
  );
}

export default App;
