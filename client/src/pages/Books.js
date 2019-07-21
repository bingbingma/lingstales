import React, { Component } from "react";
import ControlledCarousel from "../components/carousel/carousel";
import Comments_Section from "../components/commentmaster";

class Books extends Component {
  render() {
    return (
      <div>
        <ControlledCarousel />
        {/* <Comments_Section /> */}
      </div>
    );
  }
}
export default Books;
