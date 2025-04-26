import React, { Component } from "react";
import { Sugar } from "react-preloaders";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AntLogic from "./pages/Projects/Antlogic/Antlogic";
import ICSYAK from "./pages/Projects/ICSYAK/ICSYAK";
import Splitter from "./pages/Splitter/Splitter";

import { preloadImages } from "./utils/preloadimages";
import KTANE from "./pages/KTANE/KTANE";
import CheckersAI from "./pages/Projects/CheckersAI/CheckersAI";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shetr: false,
    };
  }

  toggleShetr = () => {
    this.setState((prevState) => ({
      shetr: !prevState.shetr,
    }));
  };

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
          background="var(--color-neutral)"
          color="var(--color-neutral-content)"
        />

        <Navbar shetr={this.state.shetr} />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home shetr={this.state.shetr} toggleShetr={this.toggleShetr} />} />

          {/* Misc */}
          <Route path="/splitter" element={<Splitter />} />
          <Route path="/ktane" element={<KTANE />} />

          {/* Projects */}
          <Route path="/projects/antlogic" element={<AntLogic />} />
          <Route path="/projects/ICSYAK" element={<ICSYAK />} />
          <Route path="/projects/CheckersAI" element={<CheckersAI />} />

          { /* 404 */}
          <Route path="*" element={<Home />} />



        </Routes>

        <Footer shetr={this.state.shetr} />
      </Router>
    );
  }
}

export default App;
