import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
