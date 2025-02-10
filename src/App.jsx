import React, { Component } from "react";
import { Sugar } from "react-preloaders";
import { Route, HashRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./components/pages/Home/home";
import AntLogic from "./components/pages/Projects/Antlogic/antlogic";
import ICSYAK from "./components/pages/Projects/ICSYAK/icsyak";
import Splitter from "./components/pages/Splitter/splitter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 100); // Set loading to false after 1 second
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
