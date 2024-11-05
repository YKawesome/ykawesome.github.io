import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sugar } from "react-preloaders";

import Home from "./components/pages/Home/home";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import AntLogic from "./components/pages/Projects/Antlogic/antlogic";

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
      <Router basename="/Portfolio">
        <Sugar
          customLoading={loading}
          background={"oklch(var(--n))"}
          color={"oklch(var(--b1))"}
        />

        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Projects */}
          <Route path="/projects" element={<Home />} />
          <Route path="/projects/antlogic" element={<AntLogic />} />


        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default App;
