import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Book2 from "./pages/Book2"; // Import the new Book2 component
import Footer from "./components/footer/Footer"; // Ensure this path is correct
import "./App.css"; // Import the App.css file for styling

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/book2" component={Book2} /> {/* Add the new route */}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
