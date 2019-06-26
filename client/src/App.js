import React, { Component } from "react";
import ControlledCarousel from "./components/carousel/carousel";
import NavBar from "./components/navbar";
import "./App.css";
import Comments_Section from "./components/commentmaster";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        {/* Carousel section*/}

        <ControlledCarousel />
        {/* Comments section*/}

        <Comments_Section />
      </div>
    );
  }
}
export default App;
