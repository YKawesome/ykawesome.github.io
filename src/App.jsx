import React, { Component } from "react";
import { Sugar } from "react-preloaders";

import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Footer from "./components/footer/footer";
import "./App.css";

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
      <React.Fragment>
        <Navbar />
        <Hero />
        <Footer />
        <Sugar customLoading={loading} background={"oklch(var(--n))"} color={"oklch(var(--b1))"}/>
      </React.Fragment>
    );
  }
}

export default App;