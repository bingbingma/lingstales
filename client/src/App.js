import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Book2 from './pages/Book2'; // Import the new Book2 component
import NavBar from './components/navbar'; // Import the NavBar component

function App() {
  return (
    <Router>
      <div>
        <NavBar /> {/* Include the NavBar component */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/book2" component={Book2} /> {/* Add the new route */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
