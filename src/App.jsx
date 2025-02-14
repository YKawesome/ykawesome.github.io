import React, { Component } from "react";
import { Sugar } from "react-preloaders";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/Home/home";
import AntLogic from "./pages/Projects/Antlogic/antlogic";
import ICSYAK from "./pages/Projects/ICSYAK/icsyak";
import Splitter from "./pages/Splitter/splitter";

import { preloadImages } from "./utils/preloadimages";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      await preloadImages();
    } catch (error) {
      console.error("Error preloading images:", error);
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <Router>
        <Sugar
          customLoading={loading}
          background={"oklch(var(--n))"}
          color={"oklch(var(--b1))"}
        />

        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Misc */}
          <Route path="/splitter" element={<Splitter />} />

          {/* Projects */}
          <Route path="/projects" element={<Home />} />
          <Route path="/projects/antlogic" element={<AntLogic />} />
          <Route path="/projects/ICSYAK" element={<ICSYAK />} />

          { /* 404 */}
          <Route path="*" element={<Home />} />



        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default App;
