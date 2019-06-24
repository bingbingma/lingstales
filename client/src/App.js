import React, { Component } from "react";
import ControlledCarousel from "./components/carousel/carousel";
import NavBar from "./components/navbar";
import "./App.css";

import Comments_Section from "./components/commentmaster";
import forwardRef from '@restart/context/forwardRef'

class App extends Component {
  //   // constructor for comments

  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       comments: [],
  //       loading: false
  //     };

  //     this.addComment = this.addComment.bind(this);
  //   }
  //   // component mounting for comments
  //   componentDidMount() {
  //     // loading
  //     this.setState({ loading: true });

  //     // get all the comments
  //     fetch("http://localhost:7777")
  //       .then(res => res.json())
  //       .then(res => {
  //         this.setState({
  //           comments: res,
  //           loading: false
  //         });
  //       })
  //       .catch(err => {
  //         this.setState({ loading: false });
  //       });
  //   }

  //   /**
  //    * Add new comment section function
  //    * @param {Object} comment
  //    */
  //   addComment(comment) {
  //     this.setState({
  //       loading: false,
  //       comments: [comment, ...this.state.comments]
  //     });
  //   }
  // app section
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
