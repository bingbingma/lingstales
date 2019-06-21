import React, { Component } from "react";
import Carousel from "./components/carousel/carousel";
import NavBar from "./components/navbar";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <NavBar />

          <break />

          <Carousel />
        </div>
      </div>
    );
  }
}

export default App;
