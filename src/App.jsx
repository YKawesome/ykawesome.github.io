import React from "react";

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
    </React.Fragment>
  );
}

export default App;