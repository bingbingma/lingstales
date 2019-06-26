import React, { Component } from "react";
import Carousel from "./components/carousel/carousel";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Comments_Section from "./components/commentmaster";

class App extends Component {
  // app section
  render() {
    return (
      <div className="App">
        <Route
              exact
              path="/">
        <NavBar />
        {/* Carousel section*/}
        <Carousel />
        {/* Comments section*/}
        <Comments_Section />
        </Route>
        <Route path="/home" component={Home} />

      </div>
    );
  }
}
export default App;
