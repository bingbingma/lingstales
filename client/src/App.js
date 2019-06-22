import React from "react";
import logo from "./logo.svg";
import Carousel from "./components/carousel/carousel";
import NavBar from "./components/navbar";
import Home from "./components/landingpage/landingpage";
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
   
          <NavBar />

          <break />

          <Route exact path="/" component={Carousel}/>
          <Route exact path="/carousel" component={Carousel}/>
          
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
