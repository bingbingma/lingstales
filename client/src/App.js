import React, { Component } from "react";
import logo from "./logo.svg";
import Carousel from "./components/carousel";
import NavBar from "./components/navbar";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ling's Tales</h2> */}
          <NavBar />
          <break></break>
          <p>TEST</p>
          <Carousel />          
        </div>
      </div>
    );
  }
}


export default App;
